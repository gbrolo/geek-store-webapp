import {
  MOUNT,
  UNMOUNT,
  GET_PRODUCTS,
  SET_PRODUCTS,
  SELECT_CATEGORY,
  GET_SINGLE_PRODUCT,
  SHOW_SINGLE_PRODUCT,
  SET_CURRENT_PRODUCT,
  ADD_PRODUCT_TO_CART,
} from './constants';

export function addProductToCart() {
  return {
    type: ADD_PRODUCT_TO_CART,
  };
}

export function setCurrentProduct(currentItem) {
  return {
    type: SET_CURRENT_PRODUCT,
    currentItem,
  };
}

export function showSingleProduct(showCurrentItem) {
  return {
    type: SHOW_SINGLE_PRODUCT,
    showCurrentItem,
  };
}

export function getSingleProduct(currentItem) {
  return {
    type: GET_SINGLE_PRODUCT,
    currentItem,
  };
}

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category,
  };
}

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