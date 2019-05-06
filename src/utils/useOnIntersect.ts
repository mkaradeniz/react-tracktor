import React from 'react';
import { useInView } from 'react-intersection-observer';

// Types
import { IntersectionOptions } from 'react-intersection-observer';

type UseOnIntersectInput = {
  callback: () => void;
  options?: IntersectionOptions;
};

type UseOnIntersectReturn = [(node?: Element | null | undefined) => void, boolean];

const useOnIntersect = ({ callback, options = {} }: UseOnIntersectInput): UseOnIntersectReturn => {
  const [ref, inView] = useInView(options);

  React.useEffect(() => {
    if (inView) {
      callback();
    }
  }, [callback, inView]);

  return [ref, inView];
};

export default useOnIntersect;
