import { takeLatest, put } from 'redux-saga/effects';
import { requestGetAllCategories } from './axios/providers/categories';
import { showProcessFeedback } from './components/ProcessFeedback/actions';
import { getCategories, setCategories } from './rootActions';
import { GET_CATEGORIES } from './rootConstants';
import { setProcessFeedback } from './utils/helpers';

export default function* productsContainerSaga() {
  yield takeLatest(GET_CATEGORIES, getCategoriesSaga);

  yield put(getCategories());
}

export function* getCategoriesSaga() {  
  try {
    const data = yield requestGetAllCategories();    
    yield put(setCategories(data.body));
  } catch (error) {
    const response = yield error();    
    yield put(showProcessFeedback(setProcessFeedback({
      message: response.message,
      severity: 'error',
    })));
  }
}