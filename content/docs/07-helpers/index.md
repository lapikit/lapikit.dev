---
title: 'Discover the Lapikit helpers'
category: 'Helpers'
head:
  title: 'Helpers'
  description: 'Small, typed utility functions from Lapikit to format strings and numbers in your Svelte apps, with safe handling of null and undefined values.'
keywords:
  - 'helpers'
  - 'utilities'
  - 'format'
  - 'functions'
navigation:
  label: 'All helpers'
---

Lapikit helpers are small pure functions for the formatting jobs you repeat in every interface: a label to capitalize, a counter to shorten. They have no dependency, work on the server and in the browser, and return `undefined` for `null` or `undefined` so you can pass optional data without a guard.

```js
import { upperFirst, compactNumber } from 'lapikit/helpers';
```

## Available helpers

```component
summary-section key="Helpers"
```
