import { takeLatest, select, put } from 'redux-saga/effects';
import { requestGetProductsAdvanced } from '../../axios/providers/products';
import { getProducts, setProducts } from './actions';
import { GET_PRODUCTS, MOUNT } from './constants';
import makeSelectProductsContainer from './selectors';

export default function* productsContainerSaga() {
  yield takeLatest(MOUNT, mountSaga);
  yield takeLatest(GET_PRODUCTS, getProductsSaga);
}

export function* getProductsSaga() {
  const productsContainer = yield select(makeSelectProductsContainer());

  if (yield !productsContainer.stopFetching) {
    try {
      const data = yield requestGetProductsAdvanced(
        productsContainer.condition,
        productsContainer.size,
        productsContainer.page,
        productsContainer.search,
      );      
      yield put(setProducts(data.body));
    } catch (error) {
      const response = yield error();
      yield console.log(response);
    }
  }
}

export function* mountSaga() {
  const productsContainer = yield select(makeSelectProductsContainer());
  yield put(getProducts(
    productsContainer.condition,
    productsContainer.size,
    productsContainer.page,
    productsContainer.search,
  ));
}