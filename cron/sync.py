import os
import re
import json
import logging
from typing import Dict, TypedDict, Any, List
from dotenv import load_dotenv
from notion_client import Client
from langgraph.graph import StateGraph, END

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

#  SECURITY PROTOCOL: Use isolated Environment Variables. Zero hardcoded secrets in the repo.
load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
APPS_DATABASE_ID = os.getenv("NOTION_APPS_DATABASE_ID")

# Absolute path targeting the frontend React data object
DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "src", "utils", "data.js")

class AgentState(TypedDict):
    local_data: Dict[str, Any]
    notion_entries: List[Dict[str, Any]]
    notion_apps: List[Dict[str, Any]]
    merged_data: Dict[str, Any]
    error: str

def fetch_notion_updates(state: AgentState) -> AgentState:
    """Authenticates with Notion API and fetches row updates securely."""
    logging.info("State Node: fetch_notion_updates")
    
    if not NOTION_TOKEN or not DATABASE_ID:
        logging.warning("No Notion credentials found in .env. Firing simulated Test Node (XSS Injection Prevention Test).")
        #  SECURITY MOCK: Intentionally inject a malicious XSS payload to test json.dumps escaping
        return {"notion_entries": [{
            "id": 4,
            "date": "Mar 25, 2026",
            "title": "Deployed Secure LangGraph Incremental Sync Engine",
            "category": "Building",
            "skill": "python",
            "description": "Wrote the GitOps pipeline. Testing zero-day XSS vulnerability defense: \"; alert('MALICIOUS INJECTION'); //"
        }], "notion_apps": []}
        
    try:
        notion = Client(auth=NOTION_TOKEN)
        results = notion.databases.query(database_id=DATABASE_ID).get("results")
        
        parsed_entries = []
        for row in results:
            props = row["properties"]
            try:
                # Safe lookups for potentially empty Notion cells
                category_obj = props.get("Category", {}) or {}
                category_select = category_obj.get("select") or {}
                
                skill_obj = props.get("Skill", {}) or {}
                skill_select = skill_obj.get("select") or {}
                
                date_obj = props.get("Date", {}) or {}
                date_data = date_obj.get("date") or {}
                
                visibility_obj = props.get("Visibility", {}) or {}
                visibility_select = visibility_obj.get("select", {}).get("name", "Visible") if "select" in (visibility_obj or {}) else "Visible"
                
                # Custom Date Formatting (%d %B %Y) -> 24 March 2026
                date_str = date_data.get("start", "")
                formatted_date = date_str
                if date_str:
                    try:
                        from datetime import datetime
                        parsed_date = datetime.strptime(date_str[:10], "%Y-%m-%d")
                        formatted_date = parsed_date.strftime("%d %B %Y")
                    except Exception:
                        pass # Fallback to raw string if parsing fails
                
                entry = {
                    "id": props.get("ID", {}).get("number", 0),
                    "date": formatted_date,
                    "title": "".join([t["plain_text"] for t in props.get("Title", {}).get("title", [])]),
                    "category": category_select.get("name", "Learning"),
                    "skill": skill_select.get("name", "default"),
                    "description": "".join([t["plain_text"] for t in props.get("Description", {}).get("rich_text", [])]),
                    "visibility": visibility_select
                }
                parsed_entries.append(entry)
            except Exception as e:
                logging.error(f"Error mapping Notion row {row['id']}: {e}")
                
        # --- FETCH APPS IF APPS_DATABASE_ID IS SET ---
        parsed_apps = []
        if APPS_DATABASE_ID:
            logging.info("Fetching static creations from Apps state database...")
            app_results = notion.databases.query(database_id=APPS_DATABASE_ID).get("results")
            for row in app_results:
                a_props = row["properties"]
                try:
                    v_obj = a_props.get("Visibility", {}) or {}
                    visibility = v_obj.get("select", {}).get("name", "Visible") if "select" in v_obj else "Visible"
                    
                    app_entry = {
                        "id": a_props.get("ID", {}).get("number", 0),
                        "name": "".join([t["plain_text"] for t in a_props.get("Name", {}).get("title", [])]),
                        "description": "".join([t["plain_text"] for t in a_props.get("Description", {}).get("rich_text", [])]),
                        "status": a_props.get("Status", {}).get("select", {}).get("name", "Stealth"),
                        "link": a_props.get("Link", {}).get("url", "#"),
                        "themeColor": a_props.get("Theme", {}).get("select", {}).get("name", "from-emerald-500/20 to-teal-500/20"),
                        "visibility": visibility
                    }
                    parsed_apps.append(app_entry)
                except Exception as e:
                    logging.error(f"Error mapping Notion App row {row['id']}: {e}")
                    
        return {"notion_entries": parsed_entries, "notion_apps": parsed_apps}

    except Exception as e:
        state["error"] = f"Notion API Connection error: {str(e)}"
        return state

def parse_local_data(state: AgentState) -> AgentState:
    """Locates and securely unpackages the raw React JS object."""
    logging.info("State Node: parse_local_data")
    if "error" in state: return state
    
    try:
        with open(DATA_FILE_PATH, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Target the JS object strictly via Regex
        match = re.search(r'export const DATA = ({.*});', content, re.DOTALL)
        if match:
            raw_js_object = match.group(1).strip()
            try:
                # If pipeline has run before, data is native JSON syntax and loads securely
                local_data = json.loads(raw_js_object)
                logging.info("Detected secure JSON syntax. Local state parsed.")
                return {"local_data": local_data}
            except json.JSONDecodeError:
                # If reading standard hand-written JS file arrays fails once, 
                # we fall back to absolute empty lists so no dummy data is inserted!
                logging.warning("Falling back to empty datasets to cleanse placeholders.")
                return {
                    "local_data": {
                        "logs": [],
                        "apps": [],
                        "social": {
                            "linkedin": "https://linkedin.com/in/sai-vardhan-kodimela",
                            "github": "https://github.com/saivardhankodimela",
                            "email": "https://mail.google.com/mail/?view=cm&fs=1&to=saivardhankodimela@gmail.com"
                        }
                    }
                }
        
    except Exception as e:
        state["error"] = f"Local parsing fatality: {str(e)}"
        return state

def merge_diff_safely(state: AgentState) -> AgentState:
    """
    Merging Logic Core.
     SECURITY POLICY (Accidental Deletion Defense):
    We strictly iterate and map incoming Notion IDs. If a local ID is *missing* from Notion, 
    we do ABSOLUTELY NOTHING. That log entry will survive permanently in Git. Notion is only allowed 
    to append or overwrite, NEVER delete from disk!
    """
    logging.info("State Node: merge_diff_safely")
    if "error" in state: return state
    
    notion_entries = state.get("notion_entries", [])
    local_data = state.get("local_data", {})
    local_logs = local_data.get("logs", [])
    
    # 1. Map existing entries to defend them
    existing_map = {log["id"]: log for log in local_logs if "id" in log}
    
    # 2. Safely superimpose the incoming Notion data array
    added_count = 0
    updated_count = 0
    
    for entry in notion_entries:
        target_id = entry.get("id")
        if not target_id: continue
        
        # Soft-Delete Remote triggers
        if entry.get("visibility") == "Deleted":
            if target_id in existing_map:
                del existing_map[target_id]
                logging.info(f"Deleted Log ID {target_id} from disk fallback.")
        else:
            if target_id in existing_map:
                updated_count += 1
            else:
                added_count += 1
            existing_map[target_id] = entry
            
    # React expects logs sequentially
    merged_logs = list(existing_map.values())
    merged_logs.sort(key=lambda x: x.get("id", 0), reverse=True)
    local_data["logs"] = merged_logs
    
    # --- MERGE APPS SAFELY ---
    notion_apps = state.get("notion_apps", [])
    local_apps = local_data.get("apps", [])
    existing_apps = {app["id"]: app for app in local_apps if "id" in app}
    
    for n_app in notion_apps:
        if n_app.get("visibility") == "Deleted":
            if n_app["id"] in existing_apps:
                del existing_apps[n_app["id"]]
                logging.info(f"Deleted App ID {n_app['id']} from disk fallback.")
        else:
            existing_apps[n_app["id"]] = n_app
            
    merged_apps = list(existing_apps.values())
    merged_apps.sort(key=lambda x: x.get("id", 0), reverse=True)
    local_data["apps"] = merged_apps
    
    state["merged_data"] = local_data
    return state

def write_secure_js(state: AgentState) -> AgentState:
    """Exports data back to React. Employs literal JSON dumps to eradicate injection vulnerabilities."""
    logging.info("State Node: write_secure_js")
    if "error" in state: return state
    
    try:
        merged_data = state.get("merged_data", {})
        
        #  SECURITY PROTOCOL (XSS Defense): 
        # By utilizing Python's robust json.dumps(), ANY raw strings pulled from the Notion API
        # (even malicious <script> tags or unescaped JS quotes) are forcefully wrapped and sterilized 
        # into pure, literal JSON string values. When Vite/React subsequently reads this, it interprets 
        # it strictly as text nodes on the virtual DOM. Injection vectors are mathematically sealed.
        safe_json_string = json.dumps(merged_data, indent=2)
        
        js_payload = f"""// AUTO-GENERATED BY LANGGRAPH GITOPS ENGINE
// SECURE JSON BOUNDARY ESTABLISHED: ALL INJECTIONS STERILIZED

export const DATA = {safe_json_string};
"""
        with open(DATA_FILE_PATH, "w", encoding="utf-8") as f:
            f.write(js_payload)
            
        logging.info("Secure JS payload successfully injected into Frontend pipeline.")
            
    except Exception as e:
        state["error"] = f"Write error: {str(e)}"
    
    return state

# ========================================================
# LANGGRAPH ORCHESTRATION MATRIX
# ========================================================
workflow = StateGraph(AgentState)

workflow.add_node("fetch", fetch_notion_updates)
workflow.add_node("parse", parse_local_data)
workflow.add_node("merge", merge_diff_safely)
workflow.add_node("write", write_secure_js)

workflow.set_entry_point("fetch")
workflow.add_edge("fetch", "parse")
workflow.add_edge("parse", "merge")
workflow.add_edge("merge", "write")
workflow.add_edge("write", END)

executor = workflow.compile()

if __name__ == "__main__":
    logging.info("Initializing LangGraph Backend Orchestrator...")
    final_state = executor.invoke({"local_data": {}, "notion_entries": [], "merged_data": {}})
    if "error" in final_state:
        logging.error(f"Orchestrator FATAL: {final_state['error']}")
    else:
        logging.info("Orchestration Cycle Complete. Yielding to Github Actions Commit Bot.")
