import React from 'react';

import { TracktorContext, initialState } from './TracktorContext';

// Types
import { ContextType, PageViewProps } from './types';

const PageView = ({ pageViewData }: PageViewProps) => {
  // We want to copy the context data, so we can use it from outside the `TracktorContext.Consumer` render prop.
  const [copiedContext, setCopiedContext] = React.useState<ContextType>(initialState);

  React.useEffect(() => {
    if (!!pageViewData && !copiedContext.dispatcher.isDefault) {
      // Get the `dispatcher` out of the context and call it with the provided `pageViewData`.
      const { dispatcher } = copiedContext;

      dispatcher(pageViewData);
    }
  }, [copiedContext.dispatcher.isDefault]);

  return (
    // We take the current context, copy it, and forward it to the next `<Tracktor />` with the data from this component merged.
    // This enables us to gradually build the tracking object and have only the appropriate data at each level.
    <TracktorContext.Consumer>
      {context => {
        setCopiedContext(context);

        return null;
      }}
    </TracktorContext.Consumer>
  );
};

export default PageView;
