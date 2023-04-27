import { Goods } from '../models/goods';
import { ListParams } from '../models/common';
import axiosClient from './axiosClient';

const goodsApi = {
  getAll(params: ListParams): Promise<Goods[]> {
    const url = 'goods';
    return axiosClient.get(url, {
        params,
      });
  },
  add(data: Goods): Promise<Goods> {
    const url = 'goods';
    return axiosClient.post(url, data, {headers:{ 'Content-Type': 'multipart/form-data'}});
  },

  edit(data: Goods): Promise<Goods> {
    const url = `goods/${data.id}`;
    return axiosClient.patch(url, data, {headers:{ 'Content-Type': 'multipart/form-data'}});
  },
  delete(id: number): Promise<Goods> {
    const url = `goods/${id}`;
    return axiosClient.delete(url);
  },
  getRegNumber(): Promise<string> {
    const url = 'goods/reg-number';
    return axiosClient.get(url);
  },
  getById(id: number): Promise<Goods> {
    const url = `goods/${id}`;
    return axiosClient.get(url);
  },
  getMap(): Promise<any> {
    const url = `map/`;
    return axiosClient.get(url);
  },
  getNotifications(): Promise<Goods[]> {
    const url = `goods?status=Просрочен`;
    return axiosClient.get(url);
  },
  addСountry(data: string): Promise<any> {
    const url = `country`;
    return axiosClient.post(url, {name: data});
  },
  addReceiver(data: string): Promise<any> {
    const url = `company`;
    return axiosClient.post(url,  {name: data});
  },
  getCountries(): Promise<any> {
    const url = `country`;
    return axiosClient.get(url);
  },
  getReceivers(): Promise<any> {
    const url = `company`;
    return axiosClient.get(url);
  },
};

export default goodsApi;
