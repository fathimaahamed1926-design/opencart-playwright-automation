# OpenCart Test Automation Framework

A scalable end-to-end test automation framework for a locally hosted OpenCart e-commerce application, developed using **Playwright and TypeScript**.

The framework automates Customer, Admin, and Guest application workflows using a maintainable Page Object Model architecture, reusable components, custom Playwright fixtures, environment-based configuration, and reusable authenticated state.

The project also integrates directly with **MySQL** to support test-data cleanup and cross-layer validation, allowing UI operations to be independently verified against the application's persisted database state.

The framework covers both the **OpenCart Admin Portal** and **Customer Portal** and is being continuously expanded as part of my automation engineering portfolio.

---

## Key Features

- End-to-end web automation using Playwright and TypeScript
- Separate Customer, Admin, and Guest test projects
- Page Object Model (POM) architecture
- Reusable page components and fixtures
- Reusable authentication state using Playwright `storageState`
- Environment-based configuration
- Dynamic and isolated test-data generation using Faker
- Fixture-based test setup and automatic teardown
- Product CRUD automation
- Product filtering and pagination handling
- MySQL database integration
- UI-to-database persistence validation
- Database-level test-data cleanup
- Reusable database and authentication utilities
- Playwright HTML reporting
- Complete end-to-end customer purchase workflow
- Search products and validate product details
- Shopping cart quantity management
- Checkout automation using reusable page components
- Business-rule validation (availability before purchase)

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- MySQL
- XAMPP
- OpenCart
- Playwright HTML Reporter
- Git / GitHub

---

## Key Automation Concepts Demonstrated

### Page Object Model

The framework uses the Page Object Model to separate test logic from UI implementation details.

Page objects are organised by application area:

- Admin
- Customer
- Shared/base functionality

Reusable UI elements are further separated into component classes.

This keeps test cases focused on business behaviour rather than locator implementation.

---

### Reusable Components

Common UI elements are represented using reusable component classes.

Examples include:

- Header components
- Footer components
- Account menu components
- Product components
- Admin toolbar components
- Alert/message components
- ProductDetailsComponent

This reduces locator duplication and improves maintainability.

---

### Custom Playwright Fixtures

Custom Playwright fixtures are used to inject page objects and reusable test dependencies directly into tests.

The framework also includes a disposable product fixture for tests that require temporary product data.

Example:

```ts
test(
  "Admin can update existing product details",
  async ({ productsPage, addOrEditProductsPage, disposableProduct }) => {

    const newModelName = "product 200";

    await productsPage.editProduct(disposableProduct.productName);

    await addOrEditProductsPage.setModel(newModelName);
    await addOrEditProductsPage.saveDetails();

    await productsPage.editProduct(disposableProduct.productName);

    const updatedModelName =
      await addOrEditProductsPage.getModel();

    expect(updatedModelName).toBe(newModelName);
  }
);
```

The fixture creates isolated test data and performs cleanup after the test completes.

---

## Database Integration Testing

The framework connects directly to the OpenCart MySQL database for backend validation and test-data management.

Database helper classes provide reusable methods for executing parameterised SQL queries.

This allows the automation suite to validate not only what appears in the browser, but also whether UI operations are correctly persisted in the database.

### UI-to-Database Validation

The current suite validates scenarios including:

- Admin-created products are persisted correctly in the database
- Product updates made through the UI are reflected in the database
- Products deleted through the UI are removed from the database
- Invalid admin login attempts are recorded correctly

Example:

```ts
const dbProductDetails =
  await ProductDatabaseHelper.getProductDetails(
    disposableProduct.productName
  );

expect(dbProductDetails).not.toBeNull();

if (!dbProductDetails) {
  throw new Error(
    `Product '${disposableProduct.productName}' was not found in database`
  );
}

expect(dbProductDetails.productName)
  .toBe(disposableProduct.productName);

expect(dbProductDetails.model)
  .toBe(disposableProduct.model);
```

---

## Test Data Isolation and Cleanup

Tests that create temporary product data use fixture-based lifecycle management.

A disposable product is created before the test requires it and removed afterwards using database helper methods.

Product cleanup accounts for OpenCart's relational database structure by removing dependent product records before removing the main product record.

This helps prevent:

- Test-data accumulation
- Dependencies between test runs
- Modification of permanent OpenCart sample products
- False failures caused by stale test data

---

## Authentication Management

The framework supports separate authentication flows for:

- Admin users
- Customer users

Playwright authentication state is stored and reused where appropriate to avoid unnecessary login operations.

Authentication state files and environment-specific credentials are excluded from source control.

---

## Dynamic Test Data

Randomised test data is generated for scenarios that create new application records.

Examples include dynamically generated:

- Product names
- Product models

This reduces conflicts between repeated test executions and supports isolated CRUD testing.

---

## Current Automated Test Coverage

### Admin Authentication

The current suite covers:

- Successful admin login
- Invalid password
- Invalid username
- Invalid username and password
- Recording invalid login attempts in the database
- Multiple failed login attempts
- Account/login blocking behaviour after repeated invalid attempts

### Admin Product Management

Automated product scenarios currently include:

- Filter products by name
- Filter products by status
- Create a new product
- Read existing product details
- Update product details
- Delete a product

### Admin UI-Database Integration

Database-backed scenarios include:

- Verify a newly created product exists in the database
- Verify updated product information is persisted
- Verify deleted products are removed from the database

### Customer Portal

Customer authentication infrastructure and customer-side Page Objects are included in the framework.

Additional customer workflows are being progressively added.

### End-to-End Business Workflows

The framework automates complete customer purchasing scenarios, including:

- Product search
- Product selection
- Availability validation
- Add to cart
- Cart updates
- Checkout
- Order confirmation

The scenarios focus on business behaviour rather than isolated UI interactions.

---

## Project Structure

```text
.
├── components/
│   ├── admin/
│   └── customer/
│   └── common/
│
├── constants/
├── enums/
│
├── fixtures/
│
├── pages/
│   ├── admin/
│   └── customer/
│
├── scripts/
│
├── testdata/
│   ├── admin/
│   └── customer/
│
├── tests/
│   ├── admin/
│   │   ├── login/
│   │   └── products/
│   ├── customer/
│   ├── guest/
│   └── setup/
│
├── types/
│
├── utils/
│   ├── authentication/
│   └── database/
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Environment Configuration

Environment-specific configuration is managed using `.env` files.

Sensitive configuration such as credentials and authentication state is excluded from Git using `.gitignore`.

Example configuration:

```env
BASE_URL=<local-opencart-url>
ADMIN_USERNAME=<admin-username>
ADMIN_PASSWORD=<admin-password>
CUSTOMER_EMAIL=<customer-email>
CUSTOMER_PASSWORD=<customer-password>
```

Do not commit real credentials or authentication state files to source control.

---

## Running the Project

### Install dependencies

```bash
npm install
```

### Start the local application

The current framework runs against a locally hosted OpenCart instance using XAMPP with Apache and MySQL.

Ensure the OpenCart application and database are running before executing the tests.

### Run the complete test suite

```bash
npx playwright test --workers=1
```

### Run Admin tests

```bash
npx playwright test --project=admin --workers=1
```

### Run tests in headed mode

```bash
npx playwright test --headed --workers=1
```

### Open the HTML report

```bash
npx playwright show-report
```

---

## Test Reporting and Debugging

Playwright's built-in tooling is used for test execution analysis and debugging.

The framework supports:

- HTML reports
- Screenshots
- Video recording
- Playwright traces
- Error context

Trace Viewer is particularly useful for analysing failed tests by reviewing browser state, locator actions, network activity and execution timing.

---

## Current Execution Strategy

The full local suite is currently executed using a single Playwright worker.

```bash
npx playwright test --workers=1
```

The local OpenCart environment uses shared application and authentication state, and some admin scenarios intentionally manipulate session/login state.

Sequential execution currently provides deterministic test isolation while the framework's parallel execution strategy is being further developed.

---

## Planned Enhancements

The framework is actively being expanded.

Planned work includes:

- Additional customer portal test coverage
- Shopping cart workflows
- Checkout workflows
- Product search and browsing scenarios
- Additional negative and boundary tests
- Expanded database validation
- API testing
- Improved parallel test isolation
- CI/CD integration
- Automated execution through GitHub Actions
- Additional reporting capabilities

---

## What This Project Demonstrates

This project is intended to demonstrate practical automation engineering skills rather than only individual UI test scripts.

It includes experience with:

- End-to-end browser automation
- TypeScript
- Playwright
- Page Object Model architecture
- Object-oriented test framework design
- Custom fixtures
- Reusable UI components
- Asynchronous programming
- Dynamic test-data generation
- Authentication state management
- Relational database validation
- SQL
- UI-to-database integration testing
- Test-data lifecycle management
- Test isolation
- Failure investigation using Playwright Trace Viewer
- Git-based source control

---

## Project Status

**Active Development**

The framework currently contains working Admin authentication, Admin product-management and UI-to-database integration scenarios, with additional Admin and Customer functionality being progressively automated.

The test suite currently passes successfully in its documented sequential local execution configuration.

---

## Author

**Fathima Ahamed**

QA / Test Automation Engineer

Technologies: Playwright | TypeScript | JavaScript | SQL | End-to-End Testing