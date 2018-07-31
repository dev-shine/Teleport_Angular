
# Dev Portal Module

#### Imports the legacy Dev Portal application as a module for use in Teleport.

Note: This module is a hack to get Dev Portal functionality into Telport as quickly as possible.
It violates, at least, the following dictates:

- Unit tests and coverage
- Use of `null` and `undefined`.
- Naming conventions
- TS Linter warnings

The goal will be to incrementally replace this module with "native" Teleport components.


## Installation

To install the module as a dependency:
```
npm i -S git+http://gitlab.teramesh.net/patrick.martin/teleport-module-dev-portal.git#1.0.0
```


## Usage Examples

```typescript
import { DevPortalModule, devPortalUtils, devPortalModels, devPortalServices } from "teleport-module-dev-portal";
```

## Documentation

Coming Soon!

Provide complete documentation for the library. Class and method signatures. Element attributes.

