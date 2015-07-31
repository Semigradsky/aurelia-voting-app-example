import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { PollsService } from 'polls/pollsService';

@inject(PollsService)
export class TopPolls {

  polls = [];

  constructor(pollsService) {
    pollsService.getTop().then((polls) => (this.polls = polls));
  }

}
