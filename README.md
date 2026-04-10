# qa-juice-shop

Playwright automation project for OWASP Juice Shop with UI, API, and security test coverage.

## Setup

Install dependencies:

```bash
npm install
```

Configure environment variables in `.env`:

```dotenv
BASE_URL=http://localhost:3000
TAGS_FILTER=
```

`TAGS_FILTER` is optional. Leave it empty to run the full selected suite.

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

The example above classifies the test as:

- API test
- Basket feature
- Positive scenario

## Running tests with selected tags

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

Examples:

- `TAGS_FILTER=api` runs all tests tagged with `@api`
- `TAGS_FILTER=basket` runs all tests tagged with `@basket`
- `TAGS_FILTER=api,basket` runs tests tagged with `@api` or `@basket`
- Empty `TAGS_FILTER` runs all tests from the selected command

## Common commands

```bash
npm test
npm run test:ui
npm run test:api
npm run test:security
npm run test:smoke
```

Tag filtering is applied on top of these commands. For example, `npm run test:api` with `TAGS_FILTER=basket` runs only API tests tagged with `@basket`.
