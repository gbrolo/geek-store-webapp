import { takeLatest, select, put, delay } from 'redux-saga/effects';
import { requestGetProduct, requestGetProducts, requestGetProductsAdvanced } from '../../axios/providers/products';
import { setProcessFeedback } from '../../utils/helpers';
import { showProcessFeedback } from '../ProcessFeedback/actions';
import { getProducts, mount, setCurrentProduct, setProducts } from './actions';
import { GET_PRODUCTS, GET_SINGLE_PRODUCT, MOUNT, SELECT_CATEGORY, ADD_PRODUCT_TO_CART } from './constants';
import makeSelectProductsContainer from './selectors';

export default function* productsContainerSaga() {
  yield takeLatest(MOUNT, mountSaga);
  yield takeLatest(GET_PRODUCTS, getProductsSaga);
  yield takeLatest(SELECT_CATEGORY, selectCategorySaga);
  yield takeLatest(GET_SINGLE_PRODUCT, getSingleProductSaga);
  yield takeLatest(ADD_PRODUCT_TO_CART, addProductToCartSaga);
}

export function* addProductToCartSaga() {
  yield put(showProcessFeedback(setProcessFeedback({
    message: `Gracias por utilizar este demo de tienda en línea! Hasta aquí llegan las funciones de este demo.`,
    severity: 'info',
    autoHideDuration: 10000,
  })));
}

export function* getSingleProductSaga() {
  const productsContainer = yield select(makeSelectProductsContainer());

  try {
    const data = yield requestGetProduct(productsContainer.currentItem);
    yield put(setCurrentProduct(data.body));
    yield put(showProcessFeedback(setProcessFeedback({
      message: data.message,
      severity: 'success',
    })));
  } catch (error) {
    const response = yield error();    
    yield put(showProcessFeedback(setProcessFeedback({
      message: response.message,
      severity: 'error',
    })));
  }
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
        yield put(showProcessFeedback(setProcessFeedback({
          message: response.message,
          severity: 'error',
        })));
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
        yield put(showProcessFeedback(setProcessFeedback({
          message: response.message,
          severity: 'error',
        })));
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