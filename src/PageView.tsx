import useTracktor from './useTracktor';

// Types
import { PageViewProps } from './types';

const PageView = ({ pageViewData }: PageViewProps) => {
  useTracktor({ pageViewData });

  return null;
};

export default PageView;
