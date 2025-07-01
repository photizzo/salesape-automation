# SalesApe

SalesApe is a project focused on automating testing for sales-related web applications using Playwright.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/photizzo/salesape-automation.git
   cd salesape
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright:
   ```bash
   npx playwright install
   ```

### Running Tests
- To run the test suite:
  ```bash
  npx playwright test
  ```
- To view the test report:
  ```bash
  npx playwright show-report
  ```

## Project Structure
- `e2e/`: Contains end-to-end tests, components, pages, and data for testing.
- `playwright.config.ts`: Configuration file for Playwright.

## License
This project is licensed under the MIT License - see the LICENSE file for details. 