import produce from 'immer';

import { 
  SHOW_PROCESS_FEEDBACK,
  CLOSE_PROCESS_FEEDBACK,
} from './constants';

export const processFeedbackInitialState = {
  settings: {
    open: false,
    severity: 'info',
    message: '',
    autoHideDuration: 3000,
    showDefaultProcessingMessage: true,
  },
};

/* eslint-disable default-case, no-param-reassign */
const processFeedbackReducer = (state = processFeedbackInitialState, action) =>
produce(state, draft => {    
  switch (action.type) {
    case SHOW_PROCESS_FEEDBACK:        
      draft.settings = action.settings;
      break;
    case CLOSE_PROCESS_FEEDBACK:
      draft.settings.open = false;
      break;
  }
});

export default processFeedbackReducer;
