import * as axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    headers: {'authorization': localStorage.getItem("Token")}
  })

const Get = (Url, data) => instance.get(Url, data)
  .then((response) => {
    return response.data;
  }).catch(error => {
    alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
    window.location = "/";
  });

const Post = (Url, data) => instance.post(Url, data)
  .then((response) => {
    return response.data;
  }).catch(error => {
    alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
    window.location = "/";
  });

const Patch = (Url, data) => instance.patch(Url, data)
  .then((response) => {
    return response.data;
  }).catch(error => {
    alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
    window.location = "/";
  });
    
const Delete = (Url, data) => instance.delete(Url, { data: data })
  .then((response) => {
    return response.data;
  }).catch(error => {
    alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
    window.location = "/";
  });


export const Branches = {
  Get: (data) => Get("/Branch", data),
  Insert: (data) => Post("/Branch", data),
  Change: (data) => Patch("/Branch", data),
  Delete: (data) => Delete("/Branch", data)
}
export const Additives = {
  Get: (data) => Get("/Additive", data),
  Insert: (data) => Post("/Additive", data),
  Change: (data) => Patch("/Additive", data),
  Delete: (data) => Delete("/Additive", data)
}
export const Products = {
  Get: (data) => Get("/Product", data),
  Insert: (data) => Post("/Product", data),
  Change: (data) => Patch("/Product", data),
  Delete: (data) => Delete("/Product", data)
}
export const Options = {
  Get: (data) => Get("/ProductOption", data),
  Insert: (data) => Post("/ProductOption", data),
  Change: (data) => Patch("/ProductOption", data),
  Delete: (data) => Delete("/ProductOption", data)
}
export const Category = {
  Get: (data) => Get("/Category", data),
  Insert: (data) => Post("/Category", data),
  Change: (data) => Patch("/Category", data),
  Delete: (data) => Delete("/Category", data)
}
export const Stocks = {
  Get: (data) => Get("/Stock", data),
  Insert: (data) => Post("/Stock", data),
  Change: (data) => Patch("/Stock", data),
  Delete: (data) => Delete("/Stock", data)
}
export const User = {
  Get: (data) => Get("/User", data),
  Insert: (data) => Post("/User", data),
  Change: (data) => Patch("/User", data),
  Delete: (data) => Delete("/User", data)
}
export const Levels = {
  Get: (data) => Get("/Level", data),
  Insert: (data) => Post("/Level", data),
  Change: (data) => Patch("/Level", data),
  Delete: (data) => Delete("/Level", data)
}
export const Comments = {
  Get: (data) => Get("/Comment", data),
  Insert: (data) => Post("/Comment", data),
  Change: (data) => Patch("/Comment", data),
  Delete: (data) => Delete("/Comment", data)
}
export const Contacts = {
  Get: (data) => Get("/Contact", data),
  Insert: (data) => Post("/Contact", data),
  Change: (data) => Patch("/Contact", data),
  Delete: (data) => Delete("/Contact", data)
}
export const Cooperations = {
  Get: (data) => Get("/Cooperation", data),
  Insert: (data) => Post("/Cooperation", data),
  Change: (data) => Patch("/Cooperation", data),
  Delete: (data) => Delete("/Cooperation", data)
}
