import deepmerge from 'deepmerge';

// Types
import { TrackingData } from '../types';

const computeTrackingData = (...args: TrackingData[]) => {
  try {
    return deepmerge.all(args);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    throw Error(
      "Couldn't parse `trackingData`. Did you try to pass `trackEvent` to an `onClick` handler directly? Try `onClick={() => trackEvent({})` instead of `onClick={trackEvent}`.",
    );
  }
};

export default computeTrackingData;
