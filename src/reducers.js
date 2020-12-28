/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import rootRed from './rootReducer';
import processFeedbackReducer from './components/ProcessFeedback/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    root: rootRed,
    feedback: processFeedbackReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
