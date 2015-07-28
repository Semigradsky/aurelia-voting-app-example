import { should } from 'chai';
import mongoose from 'mongoose';
import Account from '../models/account.js';

should();

describe('Account', () => {
  const username = '12345';

  before((done) => {
    mongoose.connect('mongodb://localhost/test');
    done();
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });

  beforeEach((done) => {
    const account = new Account({
      username,
      password: 'testy'
    });

    account.save((error) => {
      if (error) {
        console.log('error' + error.message);
      } else {
        console.log('no error');
      }
      done();
    });
  });

  it('find a user by username', (done) => {
    Account.findOne({ username }, (err, account) => {
      account.username.should.equal(username);
      console.log('   username: ', account.username);
      done();
    });
  });

  afterEach((done) => {
    Account.remove({}, () => {
      done();
    });
  });

});
