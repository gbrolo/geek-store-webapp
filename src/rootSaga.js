import { takeLatest, put } from 'redux-saga/effects';
import { requestGetAllCategories } from './axios/providers/categories';
import { getCategories, setCategories } from './rootActions';
import { GET_CATEGORIES } from './rootConstants';

export default function* productsContainerSaga() {
  yield takeLatest(GET_CATEGORIES, getCategoriesSaga);

  yield put(getCategories());
}

export function* getCategoriesSaga() {  
  try {
    const data = yield requestGetAllCategories();
    yield console.log(data.body);
    yield put(setCategories(data.body));
  } catch (error) {
    const response = yield error();
    yield console.log(response);
  }
}