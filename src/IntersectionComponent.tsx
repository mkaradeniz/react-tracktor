import React from 'react';

// Types
import { CSSProperties, ReactNode, Ref } from 'react';

type Props = {
  children: ReactNode;
};

const intersectionComponentStyle: CSSProperties = {
  height: 0,
  visibility: 'hidden',
  width: 0,
};

const IntersectionComponent = React.forwardRef(({ children }: Props, ref: Ref<any>) => {
  return (
    <>
      {children}

      <div aria-hidden={true} ref={ref} style={intersectionComponentStyle} />
    </>
  );
});

export default IntersectionComponent;
