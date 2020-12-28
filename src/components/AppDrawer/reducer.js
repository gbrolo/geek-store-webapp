import produce from 'immer';
import {
  TOGGLE_APP_DRAWER,
} from './constants';

export const initialState = {
  open: false,
};

/* eslint-disable default-case, no-param-reassign */
const appDrawerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_APP_DRAWER:
        draft.open = !draft.open;
        break;
    }
  });

export default appDrawerReducer;
