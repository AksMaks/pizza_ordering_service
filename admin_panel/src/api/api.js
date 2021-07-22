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


