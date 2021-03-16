# CheckboxTree

Run this project with `npm start` and navigate to `http://localhost:4200/`

## Developed and manually tested on:
- macOS Big Sur 11.2.2
- Chrome 89.0.4389.82
- Node 10.23.3
- npm 6.14.11
- Angular 11.2.4

## Running unit tests (Karma / Jasmine)

Run unit tests with `npm run test`

Check test coverage by opening `coverage/checkbox-tree/index.html` file in browser.

```
TOTAL: 12 SUCCESS

=============================== Coverage summary ===============================
Statements   : 100% ( 70/70 )
Branches     : 100% ( 20/20 )
Functions    : 100% ( 30/30 )
Lines        : 100% ( 55/55 )
================================================================================
````

## Running end-to-end tests (Cypress)

Run integration tests with `npm run e2e`

You can run cypress headless and export mp4 videos from tests if you do `cypress run`

```
Checkbox-tree
    ✓ should load correctly (575ms)
    ✓ should leaf checkbox work in standalone mode (387ms)
    ✓ should parent checkbox click trigger child checkboxes (621ms)
    ✓ should child checkbox click trigger parent checkboxes (887ms)
    ✓ should have colors in object based checkbox tree (214ms)


  5 passing (3s)
```

## Running linter

Run TypeScript linter with `npm run lint`

```
Linting "checkbox-tree"...
All files pass linting.
```

_Note that TS Linter is deprecated, but current Angular version still uses it by default._
