import { inject, All, FormData } from 'aurelia-framework';
import { Validation, ensure } from 'aurelia-validation';
import { HttpClient } from 'aurelia-http-client';

@inject(Validation, HttpClient)
export class Login {

  @ensure(it => it.isNotEmpty())
  username='';

  @ensure(it => it.isNotEmpty().hasMinLength(6))
  password='';

  constructor(validation, http) {
    this.validation = validation.on(this);
    this.http = http;
  }

  login() {
    this.validation.validate().then(() => {

      this.http.post('http://localhost:3000/login', { username: this.username, password: this.password })
        .then(() => {
          alert('Welcome!');
         })
        .catch(httpResponse => {
          if (httpResponse.statusCode === 401) {
            return alert('Please check login and password');
          }

          alert(httpResponse.response);
        });

    }).catch(() => {});
  }

}
