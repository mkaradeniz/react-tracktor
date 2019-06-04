import React from 'react';

import IntersectionComponent from './IntersectionComponent';
import computeTrackingData from './utils/computeTrackingData';
import useOnIntersect from './utils/useOnIntersect';
import wrapFunction from './utils/wrapFunction';
import { TracktorContext } from './TracktorContext';

// Types
import { TrackingData, TrackEventOptions, UseTracktorProps } from './types';
import { ReactNode } from 'react';

const useTracktor = ({
  eventData,
  intersectionOptions = { triggerOnce: true },
  pageViewData,
  trackingData: ownData = {},
}: UseTracktorProps) => {
  const { data, dispatcher } = React.useContext(TracktorContext);

  React.useEffect(() => {
    if (!!pageViewData && !dispatcher.isDefault) {
      // Get the `dispatcher` out of the context and call it with the provided `pageViewData`.

      dispatcher(pageViewData);
    }
  }, [dispatcher.isDefault]);

  // Gets the `dispatcher` out of the context, computes the tracking data, and calls it.
  const trackEvent = (trackEventData: TrackingData = {}, options: TrackEventOptions = {}) => {
    const { withoutContext } = options;

    if (withoutContext) {
      return dispatcher(trackEventData);
    }

    const computedTrackingData = computeTrackingData(data, ownData, trackEventData || {});

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

  return { intersectionRef, intersectionWrapper, onClickWrapper, trackEvent };
};

export default useTracktor;
