/*
 *
 * AppSearchDrawer actions
 *
 */

import {
  UNMOUNT,
  INITIATE_SEARCH,
  FINISHED_SEARCH,
  TOGGLE_APP_SEARCH_DRAWER,
} from './constants';

export function unmount() {
  return {
    type: UNMOUNT,
  };
}

export function finishedSearch(content = []) {
  return {
    type: FINISHED_SEARCH,
    content,
  };
}

export function initiateSearch() {
  return {
    type: INITIATE_SEARCH,
  };
}

export function toggleAppSearchDrawer() {
  return {
    type: TOGGLE_APP_SEARCH_DRAWER,
  };
}
