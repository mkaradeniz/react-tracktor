import React from 'react';

import useTracktor from './useTracktor';

const Test = () => {
  const { trackEvent } = useTracktor({ pageViewData: { pageView: 'useTracktor()' } });

  return <button onClick={() => trackEvent({ hello: 'fromTest' })}>Hello</button>;
};

export default Test;
