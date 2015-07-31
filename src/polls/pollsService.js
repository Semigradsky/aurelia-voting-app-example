import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { AuthService } from 'auth/authService';

@inject(HttpClient, AuthService)
export class PollsService {

  constructor(http, authService) {
    this.http = http.configure(x => {
      x.withBaseUrl('http://localhost:3000');
    });
    this.authService = authService;
  }

  getTop() {
    return new Promise((resolve) => {
      this.http.createRequest('polls')
        .asGet()
        .withHeader('Authorization', 'Bearer ' + this.authService.token)
        .send()
        .then((httpResponse) => {
          resolve(JSON.parse(httpResponse.response).polls);
        }).catch(() => resolve([]));
    });
  }

}
