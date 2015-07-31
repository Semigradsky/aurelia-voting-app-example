import { inject } from 'aurelia-framework';
import { Validation, ensure } from 'aurelia-validation';
import { AuthService } from 'auth/authService';

@inject(Validation, AuthService)
export class SignUp {

  @ensure(it => it.isNotEmpty())
  username = '';

  @ensure(it => it.isNotEmpty().hasMinLength(6))
  password = '';

  constructor(validation, authService) {
    this.validation = validation.on(this);
    this.authService = authService;
  }

  signup() {
    this.validation.validate().then(() => {

      this.authService.signUp(this.username, this.password)
        .then(() => alert('Welcome!'))
        .catch(reason => alert(reason));

    }).catch(() => {});
  }

}
