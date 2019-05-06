import React from 'react';

import IntersectionComponent from './IntersectionComponent';
import computeTrackingData from './utils/computeTrackingData';
import useOnIntersect from './utils/useOnIntersect';
import wrapFunction from './utils/wrapFunction';
import { TracktorContext, initialState } from './TracktorContext';

// Types
import { ContextType, TrackingData, TrackEventOptions, TracktorProps } from './types';
import { ReactNode } from 'react';

const Tracktor = ({ eventData, intersectionOptions = { triggerOnce: true }, render, trackingData: ownData = {} }: TracktorProps) => {
  // We want to copy the context data, so we can use it from outside the `TracktorContext.Consumer` render prop.
  const [copiedContext, setCopiedContext] = React.useState<ContextType>(initialState);

  // Gets the `dispatcher` out of the context, computes the tracking data, and calls it.
  const trackEvent = (trackEventData: TrackingData = {}, options: TrackEventOptions = {}) => {
    const { dispatcher } = copiedContext;
    const { withoutContext } = options;

    if (withoutContext) {
      return dispatcher(trackEventData);
    }

    const computedTrackingData = computeTrackingData(copiedContext.data, ownData, trackEventData || {});

    dispatcher(computedTrackingData);
  };

  // This higher-order function sets the `trackEventData` and also checks whether the library-consumer
  // defined the `eventData` which is used inside this function.
  const createOnClickWrapperFunction = (trackEventData: TrackingData = {}) => () => {
    if (!eventData && process.env.NODE_ENV !== 'production') {
      throw new Error('If the `onClickWrapper` is used, the `eventData` prop has to be defined.');
    }

    trackEvent(trackEventData || {});
  };

  // This enables the consumer to wrap a component's `onClick` prop to also fire the tracking event.
  const onClickWrapper = wrapFunction(createOnClickWrapperFunction(eventData));

  // Will be called when consumer puts the `ref` on a component and it scrolls into view.
  const handleIntersection = () => {
    if (!eventData && process.env.NODE_ENV !== 'production') {
      throw new Error('If the `intersectionRef` is used, the `eventData` prop has to be defined.');
    }

    trackEvent(eventData || {});
  };

  const [intersectionRef] = useOnIntersect({ callback: handleIntersection, options: intersectionOptions });

  // This function can be called with the elements the consumer wants to render and it will inject a
  // invsibile `<div />` with the `intersectionRef` into the DOM.
  const intersectionWrapper = (wrappedComponent: ReactNode) => (
    <IntersectionComponent ref={intersectionRef}>{wrappedComponent}</IntersectionComponent>
  );

  return (
    // We take the current context, copy it, and forward it to the next `<Tracktor />` with the data from this component merged.
    // This enables us to gradually build the tracking object and have only the appropriate data at each level..
    <TracktorContext.Consumer>
      {context => {
        setCopiedContext(context);

        const nextContextValue = { ...context, data: computeTrackingData(context.data, ownData) };

        return (
          <TracktorContext.Provider value={nextContextValue}>
            {render({ intersectionRef, intersectionWrapper, onClickWrapper, trackEvent })}
          </TracktorContext.Provider>
        );
      }}
    </TracktorContext.Consumer>
  );
};

export default Tracktor;
