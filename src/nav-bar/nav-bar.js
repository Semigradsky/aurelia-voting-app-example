import {bindable} from 'aurelia-framework';

import './nav-bar.css!';

export class NavBar {
  @bindable router = null;
  isAuthenticated = false;
}
