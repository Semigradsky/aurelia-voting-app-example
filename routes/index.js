import { Router } from 'express';
import passport from 'passport';
import Account from '../models/account';

const router = new Router();

router.get('/user', (req, res) => {
  res.json({ user: req.user });
});

router.get('/polls', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }

    console.log(user);
    console.log(info);
    const polls = [ { id: 1, title: 'Poll 1' }, { id: 1, title: 'Poll 2' } ];
    res.json({ polls });

  })(req, res, next);
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
  res.json({ user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ ok: 'good' });
});

router.get('/ping', (req, res) => {
    res.status(200).send('pong!');
});

module.exports = router;
