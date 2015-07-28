import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import './app.css!';

export class App {
  configureRouter(config, router){
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome/welcome', nav: true, title: 'Welcome' },
      { route: 'about', name: 'about', moduleId: './static/about', nav: true, title: 'About' },

      { route: 'login', name: 'login', moduleId: './auth/login', nav: false, title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: './auth/sign-up', nav: false, title: 'Sign up' }
    ]);

    this.router = router;
  }
}
