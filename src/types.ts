// Types
import { IntersectionOptions } from 'react-intersection-observer';
import { ReactNode, RefObject } from 'react';

export type ContextType = {
  data: TrackingData;
  dispatcher: Dispatcher;
};

export type Dispatcher = {
  (trackingData: TrackingData): any;
  isDefault?: boolean;
};

export type PageViewProps = {
  pageViewData: TrackingData;
};

export type TrackEventFunction = (trackEventData?: TrackingData, options?: TrackEventOptions) => void;

export type TrackEventOptions = {
  withoutContext?: boolean;
};

export type TrackingData = object;

export type TracktorProps = {
  children: ((value: TracktorRenderProp) => ReactNode) | ReactNode;
  eventData?: TrackingData;
  intersectionOptions?: IntersectionOptions;
  pageViewData?: TrackingData;
  trackingData?: TrackingData;
};

export type UseTracktorProps = {
  eventData?: TrackingData;
  intersectionOptions?: IntersectionOptions;
  pageViewData?: TrackingData;
  trackingData?: TrackingData;
};

export type TracktorProviderProps = {
  children: ReactNode;
  dispatcher: (trackingData: TrackingData) => any;
};

export type TracktorRenderProp = {
  intersectionRef: ((node?: Element | null | undefined) => void) | (RefObject<any>);
  intersectionWrapper: (wrappedComponent: ReactNode) => ReactNode;
  onClickWrapper: (wrappedFunction: (...args: any[]) => any) => (...args: any[]) => any;
  trackEvent: TrackEventFunction;
};
