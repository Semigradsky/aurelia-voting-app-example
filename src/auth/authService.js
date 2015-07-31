import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient)
export class AuthService {

  constructor(http) {
    this.http = http.configure(x => {
      x.withBaseUrl('http://localhost:3000');
    });
  }

  set token(value) {
    localStorage.setItem('token', value);
  }

  get token() {
    return localStorage.getItem('token');
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.http.post('login', { username, password })
        .then((httpResponse) => {
            const response = JSON.parse(httpResponse.response);
            this.token = response.token;
            resolve(response.user);
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
      this.http.post('register', { username, password })
        .then(resolve)
        .catch(httpResponse => reject(httpResponse.response));
    });
  }

}
