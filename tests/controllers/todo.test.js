import chai from 'chai';
import chaiHttp from 'chai-http';
import { Todo } from '../../src/database/models';

import app from '../../src/index';

chai.use(chaiHttp);
chai.should();

let id;
let dummyId = 99;
let token;

describe('Todo', () => {
  before(async () => {
    const todo = await Todo.create({
      title: 'Dummy Title',
      description: 'Dummy Description',
      priority: 1,
    });
    id = todo.id;
    const user = await chai.request(app).post('/api/auth/signup').send({
      name: 'Dummy name',
      email: 'email@email.com',
      password: process.env.TEST_PASSWORD,
    });

    token = user.body.token;
  });
  it('Should get All Todos', (done) => {
    chai
      .request(app)
      .get('/api/todos')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should create a new Todo', (done) => {
    chai
      .request(app)
      .post('/api/todos')
      .set({ 'x-auth-token': token })
      .send({
        title: 'Dummy Title',
        description: 'Dummy Description',
        priority: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.status(200);
        done();
      });
  });
  it('Should not create a new Todo when title is not specified', (done) => {
    chai
      .request(app)
      .post('/api/todos')
      .set({ 'x-auth-token': token })
      .send({
        description: 'Dummy Description',
        priority: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.status(400);
        done();
      });
  });
  it('Should get one Todo', (done) => {
    chai
      .request(app)
      .get(`/api/todos/${id}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.status(200);
        done();
      });
  });
  it('Should update new Todo', (done) => {
    chai
      .request(app)
      .put(`/api/todos/${id}`)
      .send({ title: 'New Title' })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not update when not found', (done) => {
    chai
      .request(app)
      .put(`/api/todos/${dummyId}`)
      .send({ title: 'New Title' })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should delete todo', (done) => {
    chai
      .request(app)
      .delete(`/api/todos/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not delete todo when not found', (done) => {
    chai
      .request(app)
      .delete(`/api/todos/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should not get todo when id is not in database', (done) => {
    chai
      .request(app)
      .get(`/api/todos/${id}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
});
