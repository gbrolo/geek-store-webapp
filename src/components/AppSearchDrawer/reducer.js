/*
 *
 * AppSearchDrawer reducer
 *
 */
import produce from 'immer';
import {
  UNMOUNT,
  INITIATE_SEARCH,
  FINISHED_SEARCH,
  TOGGLE_APP_SEARCH_DRAWER,
} from './constants';

export const initialState = {
  open: false,
  content: null,
  searching: false,
};

/* eslint-disable default-case, no-param-reassign */
const appSearchDrawerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FINISHED_SEARCH:
        draft.content = action.content;
        draft.searching = false;
        break;
      case INITIATE_SEARCH:
        draft.content = null;
        draft.searching = true;
        break;
      case TOGGLE_APP_SEARCH_DRAWER:
        draft.open = !draft.open;
        break;
      case UNMOUNT:
        draft.open = false;
        draft.content = null;
        draft.searching = false;
        break;
    }
  });

export default appSearchDrawerReducer;
