import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import goodsReducer from '../features/journal/goodsSlice';
// import cityReducer from 'features/city/citySlice';
// import dashboardReducer from 'features/dashboard/dashboardSlice';
// import studentReducer from 'features/student/studentSlice';
import createSagaMiddleware from 'redux-saga';
import { history } from '../utils';
import rootSaga from './rootSaga';
// import blogReducer from 'features/blog/blogSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  goods: goodsReducer,
//   dashboard: dashboardReducer,
//   student: studentReducer,
//   city: cityReducer,
//   blog: blogReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
