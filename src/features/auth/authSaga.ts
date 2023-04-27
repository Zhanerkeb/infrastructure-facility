import { put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, take, takeLatest } from 'redux-saga/effects';
import { LoginPayload, authActions } from './authSlice';
import userApi from '../../api/userApi';
import { User } from '../../models/user';

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const response: User = yield call((payload) => userApi.login(payload), action.payload)
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response))
    yield put(authActions.loginSuccess(response));
  } catch (error) {
    yield put(authActions.loginFailed('failed'));
  }
}

function* handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout); 
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin);
  yield fork(watchLoginFlow);
}
