## 🧠 Tech Stack Accountability Matrix

### **1. Vaibhav Sharma – Project Lead / Full Stack Developer**

**Primary Focus:** Architecture design, backend APIs, and dashboard integration.

| Category | Tools / Technologies | Responsibility |
|-----------|---------------------|----------------|
| **Backend Development** | Node.js, Express.js | Build REST APIs for test data, reports, and integration. |
| **Database** | SQLite / PostgreSQL | Design schema and manage test result storage. |
| **Frontend Integration** | React (Vite/Next.js) | Link backend APIs with frontend components. |
| **Auth & Middleware** | JWT / Passport.js | Secure access and API endpoints. |
| **Testing Framework** | Jest / Supertest | Unit and integration testing of backend routes. |
| **Documentation** | Markdown, Mermaid, Figma | Maintain diagrams and setup documentation. |
| **Project Governance** | GitHub Projects | Manage sprints, issues, and reviews. |
---

### **2. Dakshita Singh – Frontend Engineer (UI/UX Developer)**

**Primary Focus:** Dashboard development, visualization, and accessibility compliance.

| Category | Tools / Technologies | Responsibility |
|-----------|---------------------|----------------|
| **Frontend Framework** | React (Vite/Next.js) | Develop responsive and interactive dashboard UI. |
| **Styling** | TailwindCSS / ShadCN UI | Design modern, consistent visual layout. |
| **Visualization** | Recharts / Chart.js | Implement test trends and pass/fail insights. |
| **State Management** | Redux Toolkit / Zustand | Handle dashboard state and session data. |
| **API Integration** | Axios / Fetch API | Connect frontend to backend endpoints. |
| **Accessibility** | Axe-core, ARIA roles | Ensure WCAG compliance for UI. |
| **Design Tools** | Figma | Prepare UI mockups and flow diagrams. |

---

### **3. Vaishnavi Tiwari – Automation Engineer**

**Primary Focus:** Recorder logic, Playwright automation, and script generation.

| Category | Tools / Technologies | Responsibility |
|-----------|---------------------|----------------|
| **Automation Framework** | Playwright (TypeScript) | Generate, execute, and debug test scripts. |
| **Recorder Logic** | Chrome Extension (Manifest V3), JS | Capture user actions like clicks and inputs. |
| **Script Generator** | Node.js | Convert captured events to executable test specs. |
| **Assertions Library** | Playwright Test / Chai | Define element validation checks. |
| **Visual Regression** | Pixelmatch | Compare screenshots for UI differences. |
| **Reporting** | Allure / HTML Reports | Generate run summaries and evidence reports. |
| **Test Data** | JSON / YAML | Store and replay recorded sessions. |

---

### **4. Saiyada Anshra Afzal – DevOps Engineer**

**Primary Focus:** Continuous integration, environment setup, and pipeline management.

| Category | Tools / Technologies | Responsibility |
|-----------|---------------------|----------------|
| **CI/CD Platform** | GitHub Actions | Automate build, test, and report workflows. |
| **Environment Management** | Node.js, NPM | Setup and maintain environments for execution. |
| **Automation Scripting** | YAML, Bash | Script pipelines for Playwright runs and reporting. |
| **Containerization (Optional)** | Docker | Ensure consistent test environments. |
| **Monitoring** | GitHub Logs / Actions Console | Track build and test run results. |
| **Report Management** | Allure CLI / HTML Reports | Publish test execution summaries. |

---

### **5. Meruga Jashwanth Chopra – QA Analyst**

**Primary Focus:** Test validation, bug tracking, and documentation management.

| Category | Tools / Technologies | Responsibility |
|-----------|---------------------|----------------|
| **Manual Testing** | TestRail / Excel Sheets | Create and maintain test cases for modules. |
| **Automation Validation** | Playwright Reports | Verify and validate automation accuracy. |
| **Regression Testing** | Pixelmatch, Playwright | Ensure stable builds across iterations. |
| **Bug Tracking** | GitHub Issues / Projects | Log, prioritize, and verify issues. |
| **Accessibility Testing** | Lighthouse / Axe-core | Validate compliance with accessibility guidelines. |
| **Documentation** | Markdown / Notion | Maintain test summary, UAT plan, and reports. |

---

## 🔁 Cross-Dependency Overview

| Module | Primary Owner | Secondary Support |
|---------|----------------|------------------|
| **Backend & API Layer** | Vaibhav Sharma | Vaishnavi Tiwari |
| **Frontend UI & Dashboard** | Dakshita Singh | Vaibhav Sharma |
| **Recorder & Automation** | Vaishnavi Tiwari | Saiyada Afzal |
| **CI/CD & Deployment** | Saiyada Afzal | Vaibhav Sharma |
| **Testing & Documentation** | Meruga Chopra | Dakshita Singh |

---

## 🧭 Workflow & Collaboration Strategy

1. **Weekly Sync Meetings:** Held every Monday for progress tracking and blocker resolution.  
2. **GitHub Branch Strategy:**  
   - `main` → stable builds  
   - `dev` → ongoing development  
   - feature branches → per module (`feature/recorder`, `feature/dashboard`, etc.)  
3. **Issue Tracking:** All bugs and enhancements logged under GitHub Issues with appropriate labels.  
4. **Documentation Updates:** Each contributor updates `/docs` weekly to maintain parity with development.  
5. **Version Control Practices:** Code reviews are mandatory for all pull requests to `main`.

---

## 🧾 Deliverables Summary by December 20

| Phase | Deliverable | Responsible Person |
|--------|--------------|--------------------|
| **Phase 1 (Nov 1–15)** | Recorder prototype + Backend skeleton | Vaishnavi, Vaibhav |
| **Phase 2 (Nov 16–30)** | Dashboard UI + Local test execution | Dakshita, Vaibhav |
| **Phase 3 (Dec 1–10)** | CI/CD pipeline setup + reporting | Saiyada |
| **Phase 4 (Dec 11–18)** | QA validation + regression analysis | Jashwanth |
| **Final Submission (Dec 20)** | Complete demo, documentation, and report | All |

---

## ✅ Expected Outcomes

- A stable, modular test automation suite with visual reporting.  
- Automated CI pipeline capable of executing tests with results publishing.  
- Polished, accessible UI dashboard for result visualization.  
- Comprehensive documentation for academic and industrial presentation.  

---
