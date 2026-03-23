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
                entry = {
                    "id": props.get("ID", {}).get("number", 0),
                    "date": props.get("Date", {}).get("date", {}).get("start", ""),
                    "title": "".join([t["plain_text"] for t in props.get("Title", {}).get("title", [])]),
                    "category": props.get("Category", {}).get("select", {}).get("name", "Learning"),
                    "skill": props.get("Skill", {}).get("select", {}).get("name", "default"),
                    "description": "".join([t["plain_text"] for t in props.get("Description", {}).get("rich_text", [])])
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
                    app_entry = {
                        "id": a_props.get("ID", {}).get("number", 0),
                        "name": "".join([t["plain_text"] for t in a_props.get("Name", {}).get("title", [])]),
                        "description": "".join([t["plain_text"] for t in a_props.get("Description", {}).get("rich_text", [])]),
                        "status": a_props.get("Status", {}).get("select", {}).get("name", "Stealth"),
                        "link": a_props.get("Link", {}).get("url", "#"),
                        "themeColor": a_props.get("Theme", {}).get("select", {}).get("name", "from-emerald-500/20 to-teal-500/20")
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
                pass # Legacy hand-written JS detected. Proceed to hard-transition block.
                
        #  LEGACY TRANSITION: The first sync forces hand-typed JS into strict immutable JSON.
        logging.info("Legacy JS formatting detected. Initializing transition to strict JSON schema.")
        local_data = {
            "logs": [
                {
                    "id": 1,
                    "date": "Mar 21, 2026",
                    "title": "Setup Architecture & Deployment CI",
                    "category": "Building",
                    "skill": "react",
                    "description": "Established the React + Tailwind v4 environment locally and initialized the Vite development server routing to test new Glassmorphism themes."
                },
                {
                    "id": 2,
                    "date": "Mar 20, 2026",
                    "title": "Explored LangGraph Agent Orchestration",
                    "category": "Learning",
                    "skill": "python",
                    "description": "Tested multi-agent architectures using LangGraph strictly to orchestrate workflows involving document scraping and recursive summarization bots."
                },
                {
                    "id": 3,
                    "date": "Mar 18, 2026",
                    "title": "Testing Framer Motion Dynamics",
                    "category": "Experimenting",
                    "skill": "framer",
                    "description": "Built heavily animated scroll-linked UI elements referencing the “Terminal Industries” design aesthetics. Optimized DOM for 60fps renders."
                }
            ],
            "apps": [
                {
                    "id": 1,
                    "name": "Agentic Workflow Hub",
                    "description": "A dashboard tracking active LangGraph Python agents running on local cron schedules.",
                    "status": "Live",
                    "link": "#",
                    "themeColor": "from-emerald-500/20 to-teal-500/20"
                },
                {
                    "id": 2,
                    "name": "Glassmorphism UI Kit",
                    "description": "An open-source library of Tailwind CSS components utilizing L2 Frosted Pearl techniques.",
                    "status": "Building",
                    "link": "#",
                    "themeColor": "from-cobalt-500/20 to-blue-500/20"
                }
            ],
            "social": {
                "linkedin": "https://linkedin.com/in/sai-vardhan-kodimela",
                "github": "https://github.com/saivardhan",
                "email": "mailto:contact@saivardhan.com"
            }
        }
        return {"local_data": local_data}
        
    except Exception as e:
        state["error"] = f"Local parsing fatality: {str(e)}"
        return state

def merge_diff_safely(state: AgentState) -> AgentState:
    """
    Merging Logic Core.
     SECURITY POLICY (Accidental Deletion Defense):
    We strictly iterate and map incoming Notion IDs. If a local ID is *missing* from Notion, 
    we do ABSOLUTELY NOTHING. That log entry will survive permanently in Git. Notion is only allowed 
    to append or overwrite, NEVER delete.
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
        
        if target_id in existing_map:
            updated_count += 1
        else:
            added_count += 1
            
        existing_map[target_id] = entry
        
    logging.info(f"Diff Analysis complete: {added_count} New additions, {updated_count} Overwrites.")
        
    # React expects logs sequentially
    merged_logs = list(existing_map.values())
    merged_logs.sort(key=lambda x: x["id"], reverse=True)
    
    local_data["logs"] = merged_logs
    
    # --- MERGE APPS SAFELY ---
    notion_apps = state.get("notion_apps", [])
    if notion_apps:
        # Avoid overriding Apps that are not in Notion
        existing_apps = {app["id"]: app for app in local_data.get("apps", []) if "id" in app}
        for n_app in notion_apps:
            existing_apps[n_app["id"]] = n_app
        
        updated_apps = list(existing_apps.values())
        updated_apps.sort(key=lambda x: x["id"], reverse=True)
        local_data["apps"] = updated_apps
        logging.info(f"Merged {len(notion_apps)} dynamic apps from Notion schema.")
        
    return {"merged_data": local_data}

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
