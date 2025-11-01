import Axios from 'axios';
// Use production API for live
// For iOS simulator and web
var baseUrl = 'https://api.sharegarden.ca';
// For local development
// var baseUrl = 'http://localhost:4500';
// For Android emulator and physical devices, use your computer's IP address
//var baseUrl = 'http://192.168.1.7:4500'; // Your PC's IP address
export const Img_url = '';

export default class ApiCaller {
  static Get = (url = '', customUrl = '', headers = {}) => {
    return Axios.get(customUrl ? customUrl : `${baseUrl}${url}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Post = (endPoint = '', body = {},
    headers = {
      "Content-Type": "application/json",
    }) => {
    return Axios.post(`${baseUrl}${endPoint}`, body, {
      headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Put = (url = '', body = {}, headers = {}) => {
    return Axios.put(`${baseUrl}${url}`, body, {
      headers: { 'Content-Type': 'application/json', ...headers },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Delete = (url = '', body = {}, headers = {}) => {
    return Axios.delete(`${baseUrl}${url}`, {
      headers: { 'Content-Type': 'application/json', ...headers },
      data: body,
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static PutFormData = (url = '', body = {}, headers = {}) => {
    return Axios.put(`${baseUrl}${url}`, body, {
      headers: { 'Content-Type': 'multipart/form-data', ...headers },
    })
      .then(res => res)
      .catch(err => err.response);
  };
}
