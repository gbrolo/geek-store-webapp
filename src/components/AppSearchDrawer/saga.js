import { takeLatest, put, select } from 'redux-saga/effects';
import { INITIATE_SEARCH, TOGGLE_APP_SEARCH_DRAWER } from './constants';
import makeSelectSearchComponent from '../SearchComponent/selectors';
import { finishedSearch, unmount } from './actions';
import makeSelectAppSearchDrawer from './selectors';
import { requestGetProducts } from '../../axios/providers/products';
import { showProcessFeedback } from '../ProcessFeedback/actions';
import { setProcessFeedback } from '../../utils/helpers';

// Individual exports for testing
export default function* appSearchDrawerSaga() {
  yield takeLatest(INITIATE_SEARCH, initiateSearchSaga);
  yield takeLatest(TOGGLE_APP_SEARCH_DRAWER, toggleAppSearchDrawerSaga);
}

export function* toggleAppSearchDrawerSaga() {
  const appSearchDrawer = yield(select(makeSelectAppSearchDrawer()));

  if (!appSearchDrawer.open) {
    yield put(unmount());
  }
}

export function* initiateSearchSaga() {
  yield put(showProcessFeedback(setProcessFeedback({}, true)));
  const searchComponent = yield(select(makeSelectSearchComponent()));  

  if (searchComponent.queryString !== "") {
    try {
      const data = yield(requestGetProducts(
        8,
        0,
        searchComponent.queryString.toLowerCase(),
      ));    
      yield put(finishedSearch(data.body.products));
    } catch (error) {
      const response = error();    
      yield put(finishedSearch());
      yield put(showProcessFeedback(setProcessFeedback({
        message: response.message,
        severity: 'error',
      })));
    }
  } else {
    yield put(finishedSearch(null));
  }
}
