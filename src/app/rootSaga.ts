import authSaga  from '../features/auth/authSaga';
import goodsSaga  from '../features/journal/goodsSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), goodsSaga()]);
}
