import { RootState } from './../../app/store';
import {
  ListParams,
} from './../../models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goods } from '../../models/goods';

export interface GoodsState {
  loading?: boolean;
  list: Goods[];
  goods: Goods;
  added?: boolean;
  filter: ListParams;
  reg_number: string;
  edited?: boolean;
  map: any;
  notifications: Goods[];
  entityAdded?: boolean;
  country: any;
  reciever: any;
}

const initialState: GoodsState = {
  loading: false,
  list: [],
  goods: {
    id: 0,
    reg_number_vh: '',
    number_td_mdp: '',
    number_dt_td_tpo: '',
    date_of_receipt: new Date(),
    upload_date: new Date(),
    code_too: '',
    departure_country: '',
    carrier_country: '',
    reciver: '',
    carrier_name: '',
    bin: '',
    number_of_transportation: '',
    name: '',
    count: 0,
    gross_weight: 0,
    net_weight: 0,
    price: 0,
    documents: '',
    place: '',
    status: ''
  },
  entityAdded: false,
  added: false,
  edited: false,
  reg_number: '',
  filter: {},
  map: {},
  notifications: [],
  country: [],
  reciever: []
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    addGoods(state, action: PayloadAction<Goods>) {
    },
    editGoods(state, action: PayloadAction<Goods>) {
    },
    editGoodsSuccess(state, action: PayloadAction<Goods>) {
        state.edited = true;
    },
    getById(state, action: PayloadAction<number>) {

    },
    getByIdSuccess(state, action: PayloadAction<Goods>) {
       state.goods = action.payload
    },
    fetchRegNumber(state) {

    },
    fetchMap(state) {

    },
    getNotifications(state) {
    },
    deleteGoods(state, action: PayloadAction<number>) {

    },
    fetchMapSuccess(state, action: PayloadAction<any>) {
        state.map = action.payload
    },
    fetchCountry(state) {
       
    },
    fetchCountrySuccess(state, action: PayloadAction<any>) {
        state.country = action.payload
    },
    fetchReceiver(state) {
       
    },
    fetchReceiverSuccess(state, action: PayloadAction<any>) {
        state.reciever = action.payload
    },
    fetchRegNumberSuccess(state, action: PayloadAction<string>) {
        state.reg_number = action.payload
    },
    addGoodsSuccess(state, action: PayloadAction<Goods>) {
        state.added = true;
    },
    deleteGoodsSuccess(state, action: PayloadAction<number>) {
        state.list = state.list.filter(item => item.id !== action.payload);
    },
    fetchGoodsList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchGoodsListSuccess(
      state,
      action: PayloadAction<Goods[]>
    ) {
      state.list = action.payload;
      state.loading = false;
    },

    fetchNotificationListSuccess(
        state,
        action: PayloadAction<Goods[]>
      ) {
        state.notifications = action.payload;
      },
    fetchGoodsListFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    clearStatuses(state) {
      state.edited = false;
      state.added = false
      state.entityAdded = false;
    },
    addCountry(state, action: PayloadAction<any>) {

    },
    addCountrySuccess(state,  action: PayloadAction<any>) {
      state.country = [...state.country, action.payload]

    },
    addReceiver(state, action: PayloadAction<any>) {

    },
    addReceiverSuccess(state, action: PayloadAction<any>) {
        state.reciever = [...state.reciever, action.payload]
    },
  },
});

// Actions
export const goodsActions = goodsSlice.actions;

// Selectors
export const selectGoodsLoading = (state: RootState) => state.goods.loading;
export const selectGoodsList = (state: RootState) => state.goods.list;
export const selectNotificationsList = (state: RootState) => state.goods.notifications;
export const selectRegNumber = (state: RootState) => state.goods.reg_number;
export const selectMap = (state: RootState) => state.goods.map;
export const selectGoods = (state: RootState) => state.goods.goods;
export const selectAddSuccess = (state: RootState) => state.goods.added;
export const selectEditSuccess = (state: RootState) => state.goods.edited;
export const selectGoodsFilter = (state: RootState) => state.goods.filter;
export const selectEntityAddSuccess = (state: RootState) => state.goods.entityAdded;
export const selectCountries = (state: RootState) => state.goods.country;
export const selectReceivers = (state: RootState) => state.goods.reciever;


// Reducer
const goodsReducer = goodsSlice.reducer;
export default goodsReducer;
