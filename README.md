## Funda Test Automation Framework 
This is a test automation framework built using Playwright and TypeScript. It focuses on testing both frontend and backend functionalities of the funda.nl web application. The framework automates key features such as user login, search functionalities, and sorting options to ensure the web app performs reliably under different conditions.

## Table of Contents
1. Overview
2. Features
3. Project Structure
4. Test Scripts
5. Installation
6. Running Tests
7. Playwright Configuration
8. CI Integration
9. Managing Sensitive Data with Environment Variables

### Overview
This repository contains the automated test framework developed for testing Funda.nl, a leading real estate platform. The framework is designed to ensure seamless functionality of the website's core features, from frontend UI tests to backend API validations, by leveraging Playwright—a powerful end-to-end testing tool.

The framework is fully integrated with GitHub Actions, a CI/CD pipeline tool that automates test execution on every code push or pull request, ensuring the quality and stability of the application.

### Features 
- End-to-End Testing: Test complete flows such as login, search, sorting, and navigation across pages.
- Parallel Execution: Maximize performance with fully parallelized tests.
- Detailed Reporting: HTML reports generated after test runs for visual insights.
- Retry Mechanism: Automatic retry on failed tests (especially useful in CI environments).
- CI Integration: Configured with GitHub Actions for automated test runs on pull requests.
- Configurable Tests: Easily configure browser, retries, and other settings in playwright.config.ts.

### Project Structure
Here’s an outline of the project’s structure:

<pre>
├── .github
│   └── workflows
│       └── playwright.yml                     # GitHub Actions workflow for Playwright tests
│
├── helpers
│   ├── HouseHelper.ts                         # Helper file for managing backend test utilities
│
├── models
│   ├── CookieConsentModel.ts                  # Model for handling cookie consent
│   ├── SearchPayloadModel.ts                  # Model for search payload data
│
├── pages
│   ├── CommonPage.ts                          # Common methods and utilities for all pages
│   ├── HomePage.ts                            # Page object for the home page
│   ├── LoginPage.ts                           # Page object for the login page
│   ├── SearchPage.ts                          # Page object for the search page
│
├── tests
│   ├── backend
│   │   ├── house.spec.ts                      # Backend API tests related to house search functionality
│   │
│   ├── frontend
│   │   ├── home.spec.ts                       # Frontend test for home page elements
│   │   ├── login.spec.ts                      # Frontend test for login functionality
│   │   ├── search.spec.ts                     # Frontend test for search functionality
│   │
│   ├── resources
│   │   ├── searchDataInput.ts                 # Data Input to perform search and validate results for backend API call
│
├── README.md                                  # This README file
├── package.json                               # Node.js project configuration and dependencies
├── playwright.config.ts                       # Playwright configuration file
└── tsconfig.json                              # TypeScript configuration file
</pre>

### Test Scripts
- Frontend Tests: These tests check the user interface and interactions on the web application. They cover critical functionalities such as navigating the home page, logging in, searching and sorting properties.

You can find these tests in the `tests/frontend/ directory`

- Backend Tests: The backend tests include API tests for verifying the response and status code.

They are located in the `tests/backend/ directory`

### Installation
#### Prerequisites
Before getting started, make sure the following tools are installed on your machine:
- Node.js: This is essential to run JavaScript and TypeScript code, as well as install the necessary packages.
- Git: You will need Git for version control to clone the project repository and manage changes.

### Steps to Install
- Clone the repository: Using git command `git clone gitProjectURL`
- Install dependencies: Run `npm install` in order to install all required packages and dependencies.
- Set up environment variables: Create a .env file, and update it with your environment-specific variables.

### Running Test 
Once you have the project set up, here’s how you can run it.
- Run the tests: To execute all the Playwright tests from project, run: `npx playwright test` this will run all the tests defined in the tests/ directory.
- Running a specific test file: `npx playwright test home.spec.ts` this will run all the tests defined in the home.spec.ts file.
- Running a specific test case with title: `npx playwright test -g "Home Page Elements Visibility"` this will the test thave have title 'Home Page Elements Visibility' .
- Running a specific test in debug mode: `PWDEBUG=Console npx playwright test -g "Home Page Elements Visibility"` this will run the test in debug mode.
- View HTML Test Report: After running tests, you can view the detailed HTML report with: `npx playwright show-report`


### Playwright Configuration
The core configuration of Playwright is defined in the playwright.config.ts file. It includes settings such as:
- Test Timeouts: Specifies how long a test can run before being considered as failed due to timeout.
- Retries: Configures how many times a test should be retried if it fails.
- Browser Settings: Defines which browsers the tests will run in, along with other browser-related options like headless mode.

You can modify this file to adjust the test environment according to your needs.

### CI/ Integration
This project employs GitHub Actions to automatically run tests whenever code is pushed to the repository. The CI configuration is located in the `.github/workflows/` directory. Here’s how the process works:
- Whenever new code is committed to the repository or a pull request is made, the GitHub Actions workflow triggers automatic test execution. This ensures immediate feedback on code quality, preventing potential bugs from being merged into the main codebase.
- Tests run in a headless browser on the CI server, ensuring the code doesn’t break any functionality.
- Test results, including screenshots and videos (if any), are stored as artifacts for review.

### Managing Input Data
Input data to serach properties via API call is passed through variables from a file under resources.

### Managing Sensitive Data with Environment Variables
Sensitive information such as usernames and passwords should not be hardcoded in your tests. Instead, they are stored as environment variables and injected into the tests through GitHub Secrets.

For local development, you can create an .env file to securely manage these variables. Ensure that the .env file is added to your .gitignore to avoid committing sensitive data to the repository.

In the GitHub Actions workflow, you need to set the following secrets in your repository:
- USERNAME_VALID
- PASSWORD_VALID
- USERNAME_INVALID
- PASSWORD_INVALID
- USERAGENT

These secrets ensure that your credentials are kept secure during automated test runs.
