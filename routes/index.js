import { Router } from 'express';
import passport from 'passport';
import Account from '../models/account';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { user : req.user });
});

router.get('/register', (req, res) => {
  res.render('register', { });
});

router.post('/register', (req, res) => {
  const newUser = new Account({ username : req.body.username });
  Account.register(newUser, req.body.password, (err, account) => {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;
