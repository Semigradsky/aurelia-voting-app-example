import { inject } from 'aurelia-framework';
import { Validation, ensure } from 'aurelia-validation';
import { AuthService } from 'auth/authService';

@inject(Validation, AuthService)
export class Login {

  @ensure(it => it.isNotEmpty())
  username = '';

  @ensure(it => it.isNotEmpty().hasMinLength(6))
  password = '';

  constructor(validation, authService) {
    this.validation = validation.on(this);
    this.authService = authService;
  }

  login() {
    this.validation.validate().then(() => {

      this.authService.login(this.username, this.password)
        .then((response) => {
          console.log(response.user);
          alert('Welcome!');
         })
        .catch(reason => alert(reason));

    }).catch(() => {});
  }

}
