import produce from 'immer';
import {
  MOUNT,
  UNMOUNT,
} from './constants';

export const initialState = {
  loading: true,
  products: [],
};

/* eslint-disable default-case, no-param-reassign */
const productsContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MOUNT:
        break;
      case UNMOUNT:
        draft.loading = true;
        draft.products = [];
        break;
    }
  });

export default productsContainerReducer