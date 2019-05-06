# react-tracktor 🚜

`<Tracktor />` is a React render prop, inspired by [react-tracking](https://github.com/nytimes/react-tracking), to gradually build tracking data down the render tree. At each level, all data is available from "above" while also passing it "down". It provides several ways to trigger tracking events.

## Documentation

https://react-tracktor.netlify.com/

## Caveats

- This library only works with React versions that support [hooks](https://reactjs.org/hooks). That means `16.8.0` and up.
- This library uses the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) Browser API under the hood. This feature might not work without a polyfill for older browsers.

## Installation

```bash
yarn add react-tracktor
```

or

```bash
npm install react-tracktor
```

## Example

```typescript
import { Tracktor, TracktorProvider } from 'react-tractor';

<TracktorProvider dispatcher={trackingData => console.log(trackingData)}>
  <Tracktor
    trackingData={{ page: 'README.md' }}
    render={() => (
      <main>
        <h2>README.md</h2>

        <Tracktor
          trackingData={{ section: 'example' }}
          render={({ trackEvent }) => (
            <section>
              <h3>
                <code>trackEvent</code>
              </h3>

              <button onClick={() => trackEvent({ button: 'hello' })}>Hello</button>

              <button onClick={() => trackEvent({ button: 'goodbye' })}>Goodbye</button>
            </section>
          )}
        />
      </main>
    )}
  />
</TracktorProvider>;
```

## API

### `<TracktorProvider />`

`<TracktorProvider />` is required for `<Tracktor />` to work. Every render-tree requires **one** `<TracktorProvider />`. This is also where the `dispatcher`, the callback that is called whenever a tracking event occurs, is defined.

#### Props

| Name         | Type                             | Default                                       | Description                                                                                                                                                 |
| ------------ | -------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dispatcher` | `(trackingData: object) => void` | `(trackingData) => console.log(trackingData)` | The `dispatcher` is a callback that is called on every tracking event and is responsible to process and forward the data for and to any analytics solution. |

### `<Tracktor />`

The `<Tracktor />` render prop enables the consumer to gradually build tracking data.
At each point at the render tree data from all `<Tracktor />` render props above is available without the data "underneath".

#### Props

##### `<Tracktor />` Props

| Name                  | Type                                       | Default                 | Description                                                                                                                                                                                                 |
| --------------------- | ------------------------------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventData`           | _object_                                   | `{}`                    | An object with tracking data that should be provided to the `dispatcher` when the `onClickWrapper` is fired or (when using the `intersectionRef` or `intersectionWrapper`) the component scrolls into view. |
| `intersectionOptions` | _object_                                   | `{ triggerOnce: true }` | Options passed to the IntersectionObserver. <br/>See: https://github.com/thebuilder/react-intersection-observer#options                                                                                     |
| `render`              | `(value: TracktorRenderProp) => ReactNode` | _required_              | The render function                                                                                                                                                                                         |
| `trackingData`        | _object_                                   | `{}`                    | An object with data that should be used when tracking events from this component and all components further down the render tree.                                                                           |

##### `render` Props

| Name                  | Type                                          | Description                                                                                                                                  |
| --------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intersectionRef`     | _ReactRef_                                    | If used as a ref for a DOM element, a `trackEvent` will be fired with the the provided `eventData` when the refed element scrolls into view. |
| `intersectionWrapper` | `(WrappedComponent: ReactNode) => ReactNode)` | Can be used to wrap a component to inject an invisibile `<div />` which will have the `intersectionRef` and track on intersection.           |
| `onClickWrapper`      | `(trackEventData: object) => () => void`      | Can be used to wrap a component's `onClick` prop, the returning function, also fires an `trackEvent`.                                        |
| `trackEvent`          | `(trackEventData: object) => void`            | Function which fires an `trackEvent` with the provided data, merged with all previously provided `trackingData`.                             |

### `<PageView />`

`<PageView />` is used to fire an tracking event when the page loads. It needs to be wrapped in **one** top-level `<TracktorProvider />` per render-tree which defines a `dispatcher` function that recieves the provided `pageViewData` and does something with it.
See the `<TracktorProvider />` section for details.

#### Props

| Name           | Type     | Default    | Description                                                                   |
| -------------- | -------- | ---------- | ----------------------------------------------------------------------------- |
| `pageViewData` | _object_ | _required_ | An object with data that the `dispatcher` should be called with on page load. |

## Alternatives

[react-tracking](https://github.com/nytimes/react-tracking) is what inspired this approach to tracking. Use it for more advanced use cases.

## Development

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).
