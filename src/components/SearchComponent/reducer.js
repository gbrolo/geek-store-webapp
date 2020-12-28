/*
 *
 * SearchComponent reducer
 *
 */
import produce from 'immer';
import {
  UNMOUNT,
  INITIATE_SEARCH,
} from './constants';

export const initialState = {
  queryString: '',
};

/* eslint-disable default-case, no-param-reassign */
const searchComponentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UNMOUNT:
        draft.queryString = '';
        break;
      case INITIATE_SEARCH:
        draft.queryString = action.queryString
        break;
    }
  });

export default searchComponentReducer;
