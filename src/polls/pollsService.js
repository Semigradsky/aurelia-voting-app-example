import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient)
export class PollsService {

  constructor(http) {
    this.http = http;
  }

  getTop() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/polls').then((httpResponse) => {
        resolve(JSON.parse(httpResponse.response).polls);
      }).catch(() => resolve([]));
    });
  }

}
