import Axios from 'axios';
var baseUrl = 'https://api.sharegarden.ca';
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
      " content-type": "application/json",
    }) => {
    return Axios.post(`${baseUrl}${endPoint}`, body, {
      headers: { 'Content-Type': 'application/json charset=utf-8', ...headers },
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
}
