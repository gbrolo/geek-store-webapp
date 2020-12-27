import {
  GET_CATEGORIES,
  SET_CATEGORIES,
} from './rootConstants';

export function getCategories() {
  return {
    type: GET_CATEGORIES,
  };
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  };
}