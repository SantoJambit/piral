[![Piral Logo](https://github.com/smapiot/piral/raw/master/docs/assets/logo.png)](https://piral.io)

# [Piral Tracking](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/piral-tracking.svg?style=flat)](https://www.npmjs.com/package/piral-tracking) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://jestjs.io) [![Gitter Chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/piral-io/community)

This is an extension library that only has a peer dependency to `piral-core`. What `piral-tracking` brings to the table is a set of API extensions that can be used with `piral` or `piral-core`. By default, these extensions are not integrated in `piral`, so you'd need to add them to your Piral instance. The set includes the `track...` APIs to be used in pilets for using a set of analytics, telemetry, and tracking tools from your Piral instance.

## Documentation

For details on the provided API check out the [documentation at the Piral website](https://docs.piral.io) or [on GitHub](https://github.com/smapiot/piral/tree/master/docs).

## Setup and Bootstrapping

The provided library only brings API extensions for pilets to a Piral instance.

For the setup of the library itself you'll need to import `createTrackingApi` from the `piral-tracking` package.

```tsx
import { createTrackingApi } from 'piral-tracking';
```

For the integration this depends on the Piral instance.

For `piral-core`-based instances this boils down to:

```ts
const PiralInstance = createInstance({
  // important part
  extendApi: extendApis([createTrackingApi]),
  // ...
});
```

For `piral`-based instances the integration looks like:

```tsx
renderInstance({
  // important part
  extendApi: extendApis([createTrackingApi]),
  // ...
});
```

## Events

The extension gives the core a set of new events to be listened to:

- `track-event`
- `track-error`
- `track-frame-start` and `track-frame-end`

The events are fully typed.

## License

Piral is released using the MIT license. For more information see the [license file](./LICENSE).
