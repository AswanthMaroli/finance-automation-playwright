# Finance Automation Project (Playwright)

## Overview
This is a **Finance Automation Project** built using **Playwright** for automated testing of financial applications. It supports various types of testing, including **API testing, functional testing, performance testing, and security testing**.

## Tech Stack
- **Test Framework**: Playwright
- **Programming Language**: JavaScript
- **Test Runner**: Playwright Test
- **Data Generation**: Chance.js (for random test data generation)
- **Reporting**: Playwright HTML Reports

## Folder Structure
```
├───files                # Contains files for uploading
├───node_modules         # Dependencies installed via npm
├───pages                # Page Object Model (POM) implementation
├───playwright-report    # Test execution reports
├───screenshots          # Captured screenshots for failed tests
├───test-data            # JSON files containing test data
├───test-results         # Stores test execution results
├───tests                # All test cases categorized by type
│   ├───api              # API test cases
│   ├───functional       # UI functional test cases
│   ├───performance      # Performance test cases
│   └───security         # Security test cases
└───utilities            # Common utilities and helpers
    ├───chance.js        # Random data generation using Chance.js
    ├───actions.js       # UI interaction helper functions
```

## Setup and Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

### Clone the Repository
```sh
git clone <repository-url>
cd finance-automation-project
```

### Install Dependencies
```sh
npm install
```

### Run Tests
#### Run All Tests
```sh
npx playwright test
```

#### Run Specific Test
```sh
npx playwright test tests/functional/login.test.spec.js
```

#### Run with UI Mode
```sh
npx playwright test --ui
```

### Generate and View Reports
#### Generate Report
```sh
npx playwright show-report
```


