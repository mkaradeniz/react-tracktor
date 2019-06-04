import React from 'react';

import computeTrackingData from './utils/computeTrackingData';
import useTracktor from './useTracktor';
import { TracktorContext, initialState } from './TracktorContext';

// Types
import { ContextType, TracktorProps } from './types';

const Tracktor = ({ eventData, intersectionOptions = { triggerOnce: true }, render, trackingData: ownData = {} }: TracktorProps) => {
  // We want to copy the context data, so we can use it from outside the `TracktorContext.Consumer` render prop.
  const [, setCopiedContext] = React.useState<ContextType>(initialState);

  const { intersectionRef, intersectionWrapper, onClickWrapper, trackEvent } = useTracktor({
    eventData,
    intersectionOptions,
    trackingData: ownData,
  });

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
