import produce from 'immer';
import {
  MOUNT,
  UNMOUNT,
  GET_PRODUCTS,
  SET_PRODUCTS,
} from './constants';

export const initialState = {
  loading: true,
  products: [],
  condition: {
    field: 'featured',
    value: true,
  },
  size: 8,
  page: 0,
  search: null,
  totalPages: 1,
  stopFetching: false,
  renderContent: false,
};

/* eslint-disable default-case, no-param-reassign */
const productsContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PRODUCTS:
        draft.loading = false;
        draft.renderContent = true;
        draft.products = [...draft.products, ...action.productsRequestPayload.products];
        draft.totalPages = action.productsRequestPayload.totalPages;
        draft.page = draft.page + 1;

        if (draft.page < draft.totalPages) {
          draft.stopFetching = false;
        } else {
          draft.stopFetching = true;
        }
        break;
      case GET_PRODUCTS:
        draft.loading = true;
        draft.condition = action.condition;
        draft.size = action.size;
        draft.page = action.page;
        draft.search = action.search;
        break;
      case MOUNT:
        break;
      case UNMOUNT:
        draft.loading = true;
        draft.products = [];
        draft.condition = {
          field: 'featured',
          value: true,
        };
        draft.size = 8;
        draft.page = 0;
        draft.search = null;
        draft.totalPages = 1;
        draft.stopFetching = false;
        draft.renderContent = false;
        break;
    }
  });

export default productsContainerReducer