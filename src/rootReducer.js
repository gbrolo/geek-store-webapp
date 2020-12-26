import produce from 'immer';
import {
  GET_CATEGORIES,
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
        break;
    }
  });

export default rootReducer;