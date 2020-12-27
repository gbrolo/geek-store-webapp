import produce from 'immer';
import {
  GET_CATEGORIES,
  SET_CATEGORIES,
} from './rootConstants';

export const initialState = {
  categories: [],
  loadingCategories: true,
};

/* eslint-disable default-case, no-param-reassign */
const rootReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CATEGORIES:
        draft.loadingCategories = true;
        break;
      case SET_CATEGORIES:
        draft.categories = action.categories;
        draft.loadingCategories = false;
        break;
    }
  });

export default rootReducer;