# 🌿 Evolve with Vardhan - AI GitOps Portfolio

A cinematic, high-performance portfolio website driven by dynamic **Framer Motion** visuals and an automated **LangGraph Python GitOps pipeline** that syncs content securely from Notion.

---

## ⚡ Features
*   **Dynamic Visual Canopy**: Updates automatically scaling scroll aesthetics into smooth, responsive frame bundles.
*   **Full Light/Dark Sync**: Smooth themes controlling cinematic atmosphere switches dynamically.
*   **Static Frame Static Loading Framework**: React payloads populated direct-source code-free.
*   **Strict Security Matrix**: Forced anti-XSS boundary sanitization sterilizes all row entries securely.

---

## 📚 Documentation & Development History

For a complete summary of the architecture and a visual walkthrough of the development cycle (including screenshot logs), explore the docs folder:

*   **[Visual Worklog](./docs/VISUAL_WORKLOG.md)**: A chronological photo-album chronicling the iterative verify traces of fixes and setups.

---

## 🛠️ Architecture Setup (Notion Sync Action)

Every morning, a GitHub Action wakes up, calls Notion, reads updates, and injects them safely to disk files securely preserving standard local branches transparently.

### 📋 Notion Requirements

To connect cleanly without writing code, populate your Notion database templates using these exact **Case-Sensitive** columns:

#### 1. Growth Logs Database
*   **Title** (*Title*) -> Header naming.
*   **Date** (*Date*) -> Log update date.
*   **ID** (*Number*) -> Sorting key indexing (1, 2, 3...).
*   **Category** (*Select*) -> Options: `Learning`, `Building`, `Experimenting`.
*   **Skill** (*Select*) -> Slug name found on [simpleicons.org](https://simpleicons.org/) (e.g., `react`, `python`, `nodedotjs`, `docker`). Logo automatically resolves code-free.
*   **Description** (*Rich Text*) -> Paragraph brief.

#### 2. Creations & Apps Database
*   **Name** (*Title*) -> Application status name.
*   **Description** (*Rich Text*) -> Standard blurb.
*   **ID** (*Number*) -> Ordering sequence.
*   **Link** (*URL*) -> Action href domain (e.g., `https://domain.com`).
*   **Status** (*Select*) -> `Live`, `Building`, `Stealth`.
*   **Theme** (*Select*) -> Tailwind color maps (e.g., `from-emerald-500/20 to-teal-500/20`).

---

## ⚙️ CI/CD Deployment setup

To activate fully automated daily execution:

1.  Create your Notion credentials and secure integration tokens.
2.  Find each database’s 32-digit string hash code inside the addresses headers.
3.  Add them to your GitHub Action **Repository Secrets** using these variables:
    *   `NOTION_TOKEN`
    *   `NOTION_DATABASE_ID`
    *   `NOTION_APPS_DATABASE_ID` (Optional - only if utilizing Apps)

---

## 💻 Local Development

1.  **Clone down the repository**
2.  **Install dependencies**:
    ```bash
    # Node Environment (Frontend)
    npm install
    
    # Python Environment (Cron orchestrations)
    cd cron/
    pip install -r requirements.txt
    ```
3.  **Boot Development Server**:
    ```bash
    npm run dev
    ```

Yield to Vercel/Pages automatic branches for immediate live deployments securely. 🚀
