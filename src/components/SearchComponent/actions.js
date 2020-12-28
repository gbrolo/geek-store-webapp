/*
 *
 * SearchComponent actions
 *
 */

import {
  UNMOUNT,
  INITIATE_SEARCH,
} from './constants';

export function unmount() {
  return {
    type: UNMOUNT,    
  };
}

export function initiateSearch(queryString) {
  return {
    type: INITIATE_SEARCH,
    queryString,
  };
}
