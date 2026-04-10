# qa-juice-shop

Playwright automation project for OWASP Juice Shop with UI, API, and security test coverage.

## Overview

This repository contains a custom Playwright-based test framework for testing the Juice Shop application.

The framework includes:

- UI tests built on Page Object classes
- API tests built on reusable service clients
- Security-oriented tests for vulnerable application behavior
- Shared fixtures for pages and API services
- Tag-based test filtering
- Allure reporting support
- Step decorators for readable execution logs

## Tech stack

- TypeScript
- Playwright
- Allure Playwright
- Docker Compose
- dotenv

## Project structure

The repository is organized into framework code and test suites.

### Main directories

- [src/pages](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/pages) page objects for UI interactions
- [src/components](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/components) reusable UI components used by pages
- [src/modals](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/modals) modal and banner objects
- [src/api/clients](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/api/clients) low-level API client logic
- [src/api/services](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/api/services) high-level domain API services
- [src/data](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/data) test data and data factories
- [src/utils](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/utils) framework utilities such as environment parsing and step decorators
- [tests/ui](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/tests/ui) UI test suite
- [tests/api](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/tests/api) API test suite
- [tests/security](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/tests/security) security-focused test suite
- [tests/attributes](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/tests/attributes) shared test metadata such as tags
- [tests/fixtures.ts](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/tests/fixtures.ts) custom Playwright fixtures exposed to tests

### Key framework files

- [playwright.config.ts](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/playwright.config.ts) Playwright configuration, reporters, projects, and tag filtering
- [src/utils/env.ts](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/utils/env.ts) environment variable parsing and normalization
- [src/utils/step.ts](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/utils/step.ts) decorator for wrapping methods with `test.step`
- [tests/attributes/tags.ts](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/tests/attributes/tags.ts) central storage for reusable test tags
- [docker-compose.yml](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/docker-compose.yml) local Juice Shop container setup

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start Juice Shop

Start the local application with Docker:

```bash
npm run docker:up
```

The app will be available at `http://localhost:3000`.

Stop and clean the container when needed:

```bash
npm run docker:down
```

### 3. Configure environment variables

Create or update `.env`:

```dotenv
BASE_URL=http://localhost:3000
TAGS_FILTER=
START_WEB_SERVER=false
CI=false
```

### Environment variables

- `BASE_URL` base URL of the tested application
- `TAGS_FILTER` optional comma-separated list of tags for test filtering
- `START_WEB_SERVER` reserved flag for environments that manage app startup from the test runner
- `CI` CI mode flag

## Running tests

### Main commands

```bash
npm test
npm run test:ci
npm run test:ui
npm run test:api
npm run test:security
```

### Browser-specific commands

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Debugging commands

```bash
npm run test:headed
npm run test:debug
```

### Quick filtered commands

```bash
npm run test:smoke
npm run test:auth
npm run test:search
npm run test:basket
```

## Test architecture

The framework is built around separation of concerns:

- test files contain scenarios and assertions
- page objects contain UI actions and UI-specific expectations
- API services contain request logic and response helpers
- fixtures create the test dependencies used in test bodies

This makes tests shorter, easier to read, and easier to maintain.

## Fixtures

Custom fixtures are defined in [tests/fixtures.ts](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/tests/fixtures.ts).

### Available fixtures

- `pages` access to prepared page object instances
- `api` access to grouped API service instances
- `expect` re-exported Playwright assertions

### Example

```typescript
import { test, expect } from "../fixtures";

test("should open home page", async ({ pages }) => {
  await pages.homePage.open();
  await pages.homePage.expectLoaded();
});
```

The current `pages` fixture exposes:

- `homePage`
- `loginPage`
- `basketPage`

The current `api` fixture exposes:

- `auth`
- `products`
- `basket`

## Writing UI tests

UI tests should rely on page objects instead of placing raw selectors directly in spec files whenever possible.

### Recommended flow

1. Use a fixture from `pages`
2. Call page methods for actions
3. Keep assertions in test files or page methods depending on readability
4. Add tags to the test metadata

### Example UI test

```typescript
import { test } from "../fixtures";
import { Tags } from "../attributes/tags";

test(
  "should search for a product",
  {
    tag: [Tags.TEST_TYPE.UI, Tags.FEATURE.SEARCH],
  },
  async ({ pages }) => {
    await pages.homePage.open();
    await pages.homePage.expectLoaded();
    await pages.homePage.navbar.search("OWASP Juice Shop Hoodie");
    await pages.homePage.expectProductVisible("OWASP Juice Shop Hoodie");
  },
);
```

## Writing API tests

API tests should use domain services from [src/api/services](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/api/services) instead of constructing raw requests inside spec files.

### Recommended flow

1. Use the `api` fixture
2. Call the service method that matches the business action
3. Parse or validate the response in the test
4. Use test data factories when a user or payload must be generated

### Example API test

```typescript
import { test, expect } from "../fixtures";
import { createTestUser } from "@src/data/factories/userFactory";
import { Tags } from "../attributes/tags";

test(
  "should add item to basket for authorized user",
  {
    tag: [Tags.TEST_TYPE.API, Tags.FEATURE.BASKET, Tags.SCENARIO.POSITIVE],
  },
  async ({ api }) => {
    const user = createTestUser();
    const login = await api.auth.registerAndLogin(user);

    const response = await api.basket.addItem(login.token, {
      ProductId: 1,
      BasketId: login.basketId,
      quantity: 1,
    });

    expect([200, 201]).toContain(response.status());
  },
);
```

## Page objects and components

Page objects live in [src/pages](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/pages). Shared UI parts live in [src/components](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/components) and [src/modals](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/modals).

### Good practices

- keep selectors inside page object or component classes
- expose business-readable methods such as `open`, `login`, `search`, `addProductToBasket`
- reuse common behavior through a base class such as [src/pages/BasePage.ts](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/pages/BasePage.ts)
- move banner or modal logic out of tests and into reusable objects

## API services

API services live in [src/api/services](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/api/services). They wrap the lower-level HTTP client and expose domain-level operations.

### Good practices

- keep endpoint details in services, not in tests
- expose helper methods such as `registerAndLogin` when they simplify common flows
- throw meaningful errors from service helpers when a response is unexpected
- share low-level request handling through a base API client

## Using `@step`

The framework includes a method decorator in [src/utils/step.ts](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/utils/step.ts) that wraps methods with `test.step`.

This improves readability in Playwright and Allure reports.

### Why use it

- execution logs become easier to read
- report steps describe user actions instead of internal implementation
- page object methods remain self-documenting

### Static step name

```typescript
import { step } from "@src/utils/step";

class LoginPage {
  @step("Open login page")
  async open(): Promise<void> {
    // Implementation...
  }
}
```

### Dynamic step name

```typescript
import { step } from "@src/utils/step";

class Navbar {
  @step((term: string) => `Search for product: ${term}`)
  async search(term: string): Promise<void> {
    // Implementation...
  }
}
```

### When to use `@step`

- use it on meaningful page object methods
- use it on reusable component actions
- use it on modal helper methods when they appear in user flows
- avoid adding it to every tiny private helper

## Tags

### Framework tags storage

The `Tags` class is defined in [tests/attributes/tags.ts](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/tests/attributes/tags.ts). It stores reusable tags for test categorization.

Each tag is a string that starts with `@`. The current structure includes groups such as:

- `TEST_TYPE`: `@ui`, `@api`, `@security`, `@smoke`, `@regression`
- `FEATURE`: `@auth`, `@search`, `@basket`, `@products`, `@xss`
- `SCENARIO`: `@positive`, `@negative`
- `PRIORITY`: `@critical`

Use the constants from `Tags` instead of hardcoded strings to keep tag names consistent across the suite.

### Usage in test methods

Pass tags through the `tag` property in the test options:

```typescript
import { test } from "../fixtures";
import { Tags } from "../attributes/tags";

test(
  "should add item to basket for authorized user",
  {
    tag: [Tags.TEST_TYPE.API, Tags.FEATURE.BASKET, Tags.SCENARIO.POSITIVE],
  },
  async ({ api }) => {
    // Test implementation...
  },
);
```

### Running tests with selected tags

The framework supports filtering by the `TAGS_FILTER` environment variable.

Set one or more tags in `.env` as a comma-separated list:

```dotenv
TAGS_FILTER=api,basket
```

You can also use the full tag form:

```dotenv
TAGS_FILTER=@api,@basket
```

Both formats are supported. During startup, the framework normalizes values to the `@tag-name` format automatically.

When `TAGS_FILTER` contains multiple tags, the runner executes tests that match any of them.

### Examples

- `TAGS_FILTER=api` runs all tests tagged with `@api`
- `TAGS_FILTER=basket` runs all tests tagged with `@basket`
- `TAGS_FILTER=api,basket` runs tests tagged with `@api` or `@basket`
- empty `TAGS_FILTER` runs all tests from the selected command

Tag filtering is applied on top of the selected npm script. For example, `npm run test:api` with `TAGS_FILTER=basket` runs only API tests tagged with `@basket`.

## Test data

Test data helpers and factories live in [src/data](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/src/data).

Use factories when dynamic data is required, especially for entities such as test users. This reduces collisions between runs and keeps setup logic reusable.

## Path aliases

TypeScript path aliases are configured in [tsconfig.json](/Users/lena/Documents/SecurityTesting/worksaces/qa-juice-shop/tsconfig.json).

Available aliases:

- `@src/*`
- `@tests/*`

Example:

```typescript
import { step } from "@src/utils/step";
import { Tags } from "@tests/attributes/tags";
```

## Reporting

The project includes Allure reporting support.

### Run tests with Allure

```bash
npm run test:allure
```

### Generate report

```bash
npm run allure:generate
```

### Open report

```bash
npm run allure:open
```

### Output directories

- `allure-results` raw result files
- `allure-report` generated HTML report
- `test-results` Playwright output artifacts

## Recommended workflow for a new teammate

1. Install dependencies with `npm install`
2. Start the application with `npm run docker:up`
3. Configure `.env` with the correct `BASE_URL`
4. Run `npm test` or a smaller suite such as `npm run test:ui`
5. Open a few page objects and service classes to understand the framework style
6. Reuse existing fixtures, tags, page objects, and services before adding new ones

## Framework conventions

- write tests in English
- keep comments and step names in English
- use tags from `Tags` instead of hardcoded tag strings
- prefer page objects and API services over inline selectors or raw requests
- keep tests focused on scenario intent
- move repeated setup logic into fixtures, helpers, or service methods
- use `@step` for meaningful reusable actions

## Where to extend the framework

Add new code in the layer that matches its purpose:

- add a new page flow to `src/pages`
- add a reusable widget to `src/components`
- add a modal or banner helper to `src/modals`
- add a new API area to `src/api/services`
- add reusable data builders to `src/data`
- add new reusable tags to `tests/attributes/tags.ts`
- add tests to the matching suite under `tests`

## Validation

Run TypeScript validation before pushing major framework changes:

```bash
npx tsc --noEmit
```
