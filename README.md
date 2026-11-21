# Playwright Automation Portfolio

A collection of test automation projects built using **Playwright** and **TypeScript**, focused on developing practical software testing and automation skills.

## Repository Structure

```text
Playwright-Automation/
├── README.md
├── Practice-Automation/
└── HRIS-Automation/
    ├── fixtures/
    ├── pages/
    ├── test-data/
    ├── tests/
    ├── playwright.config.ts
    ├── package.json
    └── package-lock.json
```

### Projects

| Folder | Description |
|---|---|
| `Practice-Automation/` | Playwright practice exercises and learning activities. |
| `HRIS-Automation/` | Main portfolio project containing UI and API automation tests for the OrangeHRM demo application. |

---

## HRIS Automation

**Technologies Used**
- Playwright Test
- TypeScript
- Node.js
- Git

### Project Overview

This project automates selected functionalities of the OrangeHRM demo application, focusing on the Personnel Information Management (PIM) module.

It covers both UI and API testing to demonstrate different approaches to validating application functionality.

### Test Coverage

#### 1. Login UI Tests

- Login with valid credentials
- Login with invalid credentials
- Login with empty username and password fields
- Password field masking
- Forgot password navigation
- Access control for unauthenticated users

#### 2. PIM UI Tests

- Navigate to the Employee List
- Search employees by name
- Search employees by Employee ID
- Verify search results
- Search for nonexistent employees
- Clear search filters
- Add a new employee and verify the employee through ID filtering

#### 3. PIM API Tests

- Retrieve employees by name
- Retrieve employees by Employee ID
- Verify responses for nonexistent employees
- Create a new employee through the API
- Retrieve and verify the newly created employee

### Project Design

The project uses the following Playwright features and design approaches:

- **Page Object Model (POM):** Separates page locators and actions from test specifications.
- **Custom Fixtures:** Reuses authentication and page setup across tests.
- **Test Data Separation:** Keeps UI and API test data in separate files.
- **APIRequestContext:** Performs API requests using the authenticated browser context.
- **Cross-Browser Testing:** Executes tests against Chromium, Firefox, and WebKit.

### Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/galehult/Playwright-Automation.git
```

2. Navigate to the HRIS project:

```bash
cd Playwright-Automation/HRIS-Automation
```

3. Install dependencies:

```bash
npm install
```

4. Install Playwright browsers:

```bash
npx playwright install
```

### Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

```bash
npx playwright test --project=firefox
```

```bash
npx playwright test --project=webkit
```

### Test Reports

The project is configured to generate an HTML report after test execution.

View the report using:

```bash
npx playwright show-report
```

---

## Notes

- HRIS Automation uses the publicly available OrangeHRM demo application.
- Tests that create employees use dynamically generated Employee IDs to reduce conflicts with existing demo records.
- The demo application's data and availability are controlled by the external service and may change independently of this project.

---

**Author:** [galehult](https://github.com/galehult)