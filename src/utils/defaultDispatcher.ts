// Types
import { Dispatcher, TrackingData } from '../types';

const defaultDispatcher = function dispatcher(trackingData: TrackingData) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(trackingData, null, 2));
  }

  // eslint-disable-next-line no-console
  console.warn('No <TracktorProvider /> setup.');
} as Dispatcher;

// We'll mark this as the default dispatcher,
// this is used to determine whether the consumer tries to implement multiple `<Provider/>`'s.
defaultDispatcher.isDefault = true;

export default defaultDispatcher;
