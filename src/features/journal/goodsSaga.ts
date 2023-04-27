import { PayloadAction } from '@reduxjs/toolkit';
import goodsApi from '../../api/goodsApi';
import {  Goods } from '../../models/goods';
import {  ListParams } from '../../models/common';
import { call, put, takeLatest } from 'redux-saga/effects';
import { goodsActions } from './goodsSlice';
import { message } from 'antd';

function* fetchGoodsList(action: PayloadAction<ListParams>) {
  try {
    const response: Goods[] = yield call(
      goodsApi.getAll,
      action.payload
    );
    yield put(goodsActions.fetchGoodsListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch goods list', error);
    yield put(goodsActions.fetchGoodsListFailed('failed'));
  }
}

function* fetchRegNumber(action: PayloadAction<string>) {
    try {
      const response: string = yield call(
       (payload) => goodsApi.getRegNumber(),
        action.payload
      );
      yield put(goodsActions.fetchRegNumberSuccess(response));
    } catch (error) {
      console.log('Failed to fetch goods list', error);
    }
}

function* fetchGoods(action: PayloadAction<number>) {
    try {
    const response: Goods = yield call(
        goodsApi.getById,
        action.payload
    );
    yield put(goodsActions.getByIdSuccess(response));
    } catch (error) {
    console.log('Failed to fetch goods list', error);
    //   yield put(goodsActions.fetchGoodsListFailed('failed'));
    }
}

function* addGoods(action: PayloadAction<Goods>) {
    try {
    const response: Goods = yield call(
        goodsApi.add,
        action.payload
    );
    yield put(goodsActions.addGoodsSuccess(response));
    } catch (error) {
        message.error('Произошла ошибка')
        console.log('Failed to fetch goods list', error);
    }
}

function* editGoods(action: PayloadAction<Goods>) {
    try {
    const response: Goods = yield call(
        goodsApi.edit,
        action.payload
    );
    console.log(response)
      yield put(goodsActions.editGoodsSuccess(response));
    } catch (error) {
        message.error('Произошла ошибка')
        console.log('Failed to fetch goods list', error);
    }
}

function* deleteGoods(action: PayloadAction<number>) {
    try {
    const response: number = yield call(
        goodsApi.delete,
        action.payload
    );
      yield put(goodsActions.deleteGoodsSuccess(response));
    } catch (error) {
    console.log('Failed to fetch goods list', error);
    //   yield put(goodsActions.fetchGoodsListFailed('failed'));
    }
}

function* getMap(action: PayloadAction<any>): any {
    try {
    const response: any = yield call(
       (any) => goodsApi.getMap(),
        action.payload
    );
    console.log(response)
      yield put(goodsActions.fetchMapSuccess(response));
    } catch (error) {
    console.log('Failed to fetch goods list', error);
    //   yield put(goodsActions.fetchGoodsListFailed('failed'));
    }
}

function* getNotifications(action: PayloadAction<Goods>): any {
    try {
    const response: Goods[] = yield call(
       (any) => goodsApi.getNotifications(),
        action.payload
    );
      yield put(goodsActions.fetchNotificationListSuccess(response));
    } catch (error) {
    console.log('Failed to fetch goods list', error);
    //   yield put(goodsActions.fetchGoodsListFailed('failed'));
    }
}

function* addCountry(action: PayloadAction<string>) {
    try {
    const response: {} = yield call(
        goodsApi.addСountry,
        action.payload
    );
    yield put(goodsActions.addCountrySuccess(response));
    message.success('Добавлено')
    } catch (error) {
        message.error('Произошла ошибка')
        console.log('Failed to fetch goods list', error);
    }
}


function* addReceiver(action: PayloadAction<string>) {
    try {
    const response: {} = yield call(
        goodsApi.addReceiver,
        action.payload
    );
    yield put(goodsActions.addReceiverSuccess(response));
    message.success('Добавлено')
    } catch (error) {
        message.error('Произошла ошибка')
        console.log('Failed to fetch goods list', error);
    }
}

function* getReceiver(action: PayloadAction<[]>) {
    try {
    const response: [] = yield call(
       (any) =>  goodsApi.getReceivers(),
        action.payload
    );
    yield put(goodsActions.fetchReceiverSuccess(response));
    } catch (error) {
        message.error('Произошла ошибка')
        console.log('Failed to fetch goods list', error);
    }
}


function* getCountry(action: PayloadAction<[]>) {
    try {
    const response: [] = yield call(
       (any) =>  goodsApi.getCountries(),
        action.payload
    );
    yield put(goodsActions.fetchCountrySuccess(response));
    } catch (error) {
        message.error('Произошла ошибка')
        console.log('Failed to fetch goods list', error);
    }
}

export default function* goodsSaga() {
  yield takeLatest(goodsActions.fetchGoodsList.type, fetchGoodsList);
  yield takeLatest(goodsActions.fetchRegNumber.type, fetchRegNumber);
  yield takeLatest(goodsActions.getById.type, fetchGoods);
  yield takeLatest(goodsActions.addGoods.type, addGoods);
  yield takeLatest(goodsActions.editGoods.type, editGoods);
  yield takeLatest(goodsActions.fetchMap.type, getMap);
  yield takeLatest(goodsActions.deleteGoods.type, deleteGoods);
  yield takeLatest(goodsActions.getNotifications.type, getNotifications);
  yield takeLatest(goodsActions.fetchCountry.type, getCountry);
  yield takeLatest(goodsActions.fetchReceiver.type, getReceiver);
  yield takeLatest(goodsActions.addCountry.type, addCountry);
  yield takeLatest(goodsActions.addReceiver.type, addReceiver);
}
