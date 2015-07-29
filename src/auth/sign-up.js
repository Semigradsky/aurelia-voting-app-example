import { inject, All } from 'aurelia-framework';
import { Validation, ensure } from 'aurelia-validation';
import { HttpClient } from 'aurelia-http-client';

@inject(Validation, HttpClient)
export class SignUp {

  @ensure(it => it.isNotEmpty())
  username='';

  @ensure(it => it.isNotEmpty().hasMinLength(6))
  password='';

  constructor(validation, http) {
    this.validation = validation.on(this);
    this.http = http;
  }

  signup() {
    this.validation.validate().then(() => {

      this.http.post('http://localhost:3000/register', { username: this.username, password: this.password })
        .then(() => { alert('Welcome!'); })
        .catch(httpResponse => {
          alert(httpResponse.response);
        });

    }).catch(() => {});
  }

}
