import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient)
export class AuthService {

  constructor(http) {
    this.http = http;
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/login', { username, password })
        .then((httpResponse) => {
            resolve(JSON.parse(httpResponse.response));
           })
          .catch(httpResponse => {
            if (httpResponse.statusCode === 401) {
              return reject('Please check login and password');
            }
            reject(httpResponse.response);
          });
    });
  }

  signUp(username, password) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/register', { username, password })
        .then(resolve)
        .catch(httpResponse => reject(httpResponse.response));
    });
  }

}
