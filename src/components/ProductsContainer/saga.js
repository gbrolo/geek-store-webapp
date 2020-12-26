import { takeLatest, select } from 'redux-saga/effects';
import { MOUNT } from './constants';
import makeSelectProductsContainer from './selectors';

export default function* productsContainerSaga() {
  yield takeLatest(MOUNT, mountSaga);
}

export function* mountSaga() {
  const productsContainer = yield select(makeSelectProductsContainer());
  console.log('productsContainer from select inside saga: ', productsContainer);
}