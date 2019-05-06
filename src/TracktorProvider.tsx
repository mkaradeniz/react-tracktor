import React from 'react';

import { TracktorContext, initialState } from './TracktorContext';

// Types
import { TracktorProviderProps } from './types';

const TracktorProvider = ({ children, dispatcher }: TracktorProviderProps) => {
  const value = { ...initialState, dispatcher };

  return (
    <TracktorContext.Consumer>
      {context => {
        const { dispatcher: contextDispatcher } = context;

        // If `contextDispatcher.isDefault` is falsey, we already have a custom contextDispatcher set.
        // The consumer is only allowed to have one custom contextDispatcher per render tree.
        if (!contextDispatcher.isDefault && process.env.NODE_ENV !== 'production') {
          throw new Error(
            'Only one `<TracktorProvider />` is allowed in the render tree. This would lead to unexpected behaviour otherwise.',
          );
        }

        return <TracktorContext.Provider value={value}>{children}</TracktorContext.Provider>;
      }}
    </TracktorContext.Consumer>
  );
};

export default TracktorProvider;
