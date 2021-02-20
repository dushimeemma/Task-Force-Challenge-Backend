import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';

import app from '../../src/index';
config();

chai.use(chaiHttp);
chai.should();

describe('Auth', () => {
  it('Should register a new user', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        name: 'New User',
        email: 'dummy@email.com',
        password: process.env.TEST_PASSWORD,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not register a new user when email not provided', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        name: 'New User',
        password: process.env.TEST_PASSWORD,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should register a new user when already exists', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        name: 'New User',
        email: 'dummy@email.com',
        password: process.env.TEST_PASSWORD,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should login a user', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'dummy@email.com', password: process.env.TEST_PASSWORD })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not login a user when not found', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'dummy2@email.com', password: process.env.TEST_PASSWORD })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not login a user when not email not provided', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ password: process.env.TEST_PASSWORD })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
});
