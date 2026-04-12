# 🧪 QA Automation Project – OWASP Juice Shop

End-to-end test automation framework built with **Playwright + TypeScript** for testing the :contentReference[oaicite:0]{index=0} **Juice Shop** application.

This project demonstrates **UI, API, and security-focused testing**, along with scalable framework architecture, CI/CD integration, and test reporting.

---

## 🚀 Live Test Report

🔗 Allure Report (latest run):  
https://lenache-1234.github.io/qa-juice-shop/

---

## 📊 Example Test Results

### Overview

![Allure Overview](docs/allure-overview.png)

### Test Cases

![Allure Tests](docs/allure-tests.png)

### Failed Test Example

![Allure Failed](docs/allure-failed.png)

---

## 🧠 What this project demonstrates

- Building a **Playwright + TypeScript framework from scratch**
- Designing **UI, API, and security-oriented test suites**
- Creating reusable architecture:
  - Page Objects
  - Components
  - Modals
  - Fixtures
  - API clients & services
- Writing **end-to-end scenarios and API validations**
- Using **Docker for local test environment**
- Integrating tests with **GitHub Actions CI**
- Generating and publishing **Allure reports**

---

## 🧩 Tech Stack

- Playwright (UI + API testing)
- TypeScript
- Node.js
- Allure Reporter
- Docker / Docker Compose
- GitHub Actions (CI/CD)

---

## 🏗️ Project Structure

```text
src/
  pages/        → Page Objects (HomePage, LoginPage, BasketPage)
  components/   → UI components (Navbar, Modals)
  api/          → API clients & services
  utils/        → helpers
  data/         → test data

tests/
  ui/           → UI tests
  api/          → API tests
  security/     → security-focused tests

docs/           → screenshots for README
```
