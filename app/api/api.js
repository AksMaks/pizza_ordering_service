import * as axios from 'axios';
import {Alert } from 'react-native';

const createAlert = () => {
  Alert.alert('Alert Title', 'My Alert Msg', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: () => console.log('OK Pressed') },
  ]);
}
const UrlServer = "http://178.154.244.120:5000"
const instance = axios.create({
  baseURL: UrlServer+'/api',
})

const Get = (Url, data) => instance.get(Url, data)
.then((response) => {
  return {...response.data, UrlServer: UrlServer+'/'};
}).catch(error => {
  createAlert()
});

const Post = (Url, data) => instance.post(Url, data)
.then((response) => {
  return response.data;
}).catch(error => {
  createAlert()
});

const Patch = (Url, data) => instance.patch(Url, data)
.then((response) => {
  return response.data;
}).catch(error => {
  createAlert()
});

const Put = (Url, data) => instance.put(Url, data)
.then((response) => {
  return response.data;
}).catch(error => {
  createAlert()
});
    
const Delete = (Url, data) => instance.delete(Url, { data: data })
.then((response) => {
  return response.data;
}).catch(error => {
  createAlert()
});


export const Stories = {
  GetStock: (data) => Get("/Stock/", data),
  GetComment: (data) => Get("/Comment/", data),
  GetCooperation: (data) => Get("/Cooperation/", data)
}
export const Product = {
  GetProduct: (data) => Get("/Product/", data),
  GetAdditive: (data) => Get("/Additive/", data),
  GetProductOption: (data) => Get("/ProductOption/", data)
}
export const Levels = {
  GetLevel: (data) => Get("/Level/", data)
}
export const Contacts = {
  GetContact: (data) => Get("/Contact/", data)
}
export const Profile = {
  GetCode: (data) => Post("/User/getCode", data),
  Auth: (data) => Post("/User/auth", data),
  GetOne: (data) => Post("/User/one", data),
  RegRef: (data) => Post("/User/RefReg", data),
  Change: (data) => Patch("/User/", data),
}
export const Order = {
  Get: (data) => Post("/Order/get", data),
  Insert: (data) => Post("/Order/insert", data),
}
export const Address = {
  Get: (data) => Post("/Address/get", data),
  Insert: (data) => Post("/Address/", data),
  Change: (data) => Patch("/Address/", data),
  Delete: (data) => Delete("/Address/", data),
}
