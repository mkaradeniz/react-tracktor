import React from 'react';

import defaultDispatcher from './utils/defaultDispatcher';

// Types
import { ContextType } from './types';

export const initialState = {
  data: {},
  dispatcher: defaultDispatcher,
};

export const TracktorContext = React.createContext<ContextType>(initialState);
