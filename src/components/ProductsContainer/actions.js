import {
  MOUNT,
  UNMOUNT,
  GET_PRODUCTS,
  SET_PRODUCTS,
} from './constants';

export function setProducts(productsRequestPayload) {
  return {
    type: SET_PRODUCTS,
    productsRequestPayload,
  };
}

export function getProducts(condition, size, page, search) {
  return {
    type: GET_PRODUCTS,
    condition,
    size,
    page,
    search,
  };
}

export function mount() {
  return {
    type: MOUNT,
  };
}

export function unmount() {
  return {
    type: UNMOUNT,
  };
}