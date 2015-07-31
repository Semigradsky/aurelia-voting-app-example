import { Router } from 'express';
import passport from 'passport';
import Account from '../models/account';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';

const router = new Router();

router.get('/user', (req, res) => {
  res.json({ user: req.user });
});

router.get('/polls', expressJwt({ secret: 'very secret key' }), (req, res) => {
  const polls = [ { id: 1, title: 'Poll 1' }, { id: 2, title: 'Poll 2' } ];

  if (req.user) {
    polls.push({ id: 3, title: 'Your poll' });
  }

  res.json({ polls });
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
  const user = { username: req.user.username };
  const token = jwt.sign({ username: req.user.username }, 'very secret key', { expiresInMinutes: 60 * 5 });
  res.json({ user, token });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ ok: 'good' });
});

router.get('/ping', (req, res) => {
    res.status(200).send('pong!');
});

module.exports = router;
