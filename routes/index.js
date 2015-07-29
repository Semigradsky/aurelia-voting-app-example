import { Router } from 'express';
import passport from 'passport';
import Account from '../models/account';

const router = new Router();

router.get('/user', (req, res) => {
  res.json({ user: req.user });
});

router.post('/register', (req, res) => {
  const newUser = new Account({ username: req.body.username });
  Account.register(newUser, req.body.password, (err) => {
    console.log(err);
    if (err) {
      return res.status(409).send(err);
    }

    passport.authenticate('local')(req, res, () => {
      res.json({ ok: 'good' });
    });
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ ok: 'good' });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ ok: 'good' });
});

router.get('/ping', (req, res) => {
    res.status(200).send('pong!');
});

module.exports = router;
