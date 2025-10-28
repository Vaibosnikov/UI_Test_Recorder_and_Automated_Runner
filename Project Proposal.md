# **Project Title:** TestCraft – UI Test Recorder & Automated Runner

## **Project Area**
- Software Testing  
- Frontend Development  
- Full Stack Development  
- DevOps  

---

## **Scope and Objectives**

### **Overall Goal**
Develop a lightweight, user-friendly tool that enables **non-engineers** to record browser interactions and replay them as **automated UI tests**, complete with **reports** and **CI/CD integration templates**.

### **Specific Objectives**
1. Build a browser recorder (extension or in-page overlay) to capture user actions such as **clicks**, **typing**, and **navigation**.  
2. Generate **runnable Playwright specs** from recordings with **assertions**.  
3. Provide a **dashboard** to execute tests, visualize **pass/fail metrics**, view **screenshots**, and monitor **execution trends**.  
4. Offer a **CI pipeline template** for rapid setup and adoption.

---

## **Scope Definition**

### **Included**
- Browser recorder and script generation  
- Local and CI test runner  
- Dashboard with reports and visual trends  
- Visual diff baseline using **pixel comparison**

### **Not Included**
- Cross-browser grid execution  
- Advanced AI-based selector healing  
- Mobile application testing  

---

## **Project Overview**
Automated UI testing often gets neglected due to high setup costs and technical complexity.  
**TestCraft** eliminates these barriers by providing a **record-and-replay** testing workflow that can be executed instantly. It integrates test insights, dashboards, and basic visual regression capabilities—perfectly blending **Software Testing** and **Data Visualization** disciplines.

---

## **Recommended Tools & Technologies**

| Component | Technology / Tool |
|------------|------------------|
| **Recorder** | Browser Extension (Manifest V3) or In-page Overlay |
| **Runner** | Playwright (TypeScript) |
| **Dashboard / App** | React (Vite or Next.js) + Node.js API + SQLite/PostgreSQL |
| **CI/CD** | GitHub Actions |
| **Reporting** | HTML Reports / Allure |
| **Visual Diffing** | Pixelmatch |

---

## **Expected Outcomes**

### **Short-Term (Within First Month)**
- Define **architecture and data model**  
- Design **UX flow** for *Record → Run → Report*  
- Build a **Proof of Concept (PoC)** for capturing user interactions (clicks, inputs, navigations)  
- Export **Playwright test specs** with pass/fail results and screenshots  
- Develop an **initial dashboard** to display run history and artifacts  

### **Final Deliverables (By End of Project)**
- Stable and accurate **recorder** with selector strategy and assertion support  
- Functional **visual regression system** (baseline vs current)  
- Heuristic for **flaky test detection**  
- Ready-to-use **CI pipeline template** integrated with a sample site  
- **Comprehensive documentation**, demo video, and **test coverage report (unit & E2E)**  

---

## **Duration**
**8 Weeks (Fixed Timeline)**

---

## **Prerequisites for Participants**
- Proficiency in **JavaScript/TypeScript**  
- Familiarity with **DOM/CSS selectors** and **Git/GitHub**  
- *(Optional)* Prior experience with any **testing framework**  

---

## **Additional Information**
The project can be **extended** in future iterations to include:
- **API testing capabilities**  
- **Accessibility audit checks** for enhanced coverage  

---