import { takeLatest, select, put, delay } from 'redux-saga/effects';
import { requestGetProducts, requestGetProductsAdvanced } from '../../axios/providers/products';
import { getProducts, mount, setProducts } from './actions';
import { GET_PRODUCTS, MOUNT, SELECT_CATEGORY } from './constants';
import makeSelectProductsContainer from './selectors';

export default function* productsContainerSaga() {
  yield takeLatest(MOUNT, mountSaga);
  yield takeLatest(GET_PRODUCTS, getProductsSaga);
  yield takeLatest(SELECT_CATEGORY, selectCategorySaga);
}

export function* selectCategorySaga() {
  yield put(mount());
}

export function* getProductsSaga() {
  const productsContainer = yield select(makeSelectProductsContainer());

  if (yield !productsContainer.stopFetching) {
    if (yield productsContainer.search === null) {
      try {
        const data = yield requestGetProductsAdvanced(
          productsContainer.condition,
          productsContainer.size,
          productsContainer.page,
          productsContainer.search,
        );
        yield delay(1000);      
        yield put(setProducts(data.body));
      } catch (error) {
        const response = yield error();
        yield console.log(response);
      }
    } else {
      try {
        const data = yield requestGetProducts(
          productsContainer.size,
          productsContainer.page,
          productsContainer.search,
        );
        yield delay(1000);      
        yield put(setProducts(data.body));
      } catch (error) {
        const response = yield error();
        yield console.log(response);
      }
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