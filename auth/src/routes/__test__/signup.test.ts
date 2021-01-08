import request from 'supertest';
import { app } from '../../app';

describe('Signup tests', () => {
  it('returns a 201 on successful signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'qwerty',
      })
      .expect(201);
  });

  it('returns a 400 with an invalid email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'testtest.com',
        password: 'qwerty',
      })
      .expect(400);
  });

  it('returns a 400 with an invalid password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'q',
      })
      .expect(400);
  });

  it('returns a 400 with missing email and password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
      })
      .expect(400);

    await request(app)
      .post('/api/users/signup')
      .send({
        password: 'qwerty',
      })
      .expect(400);
  });

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'qwerty',
      })
      .expect(201);

    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'qwerty',
      })
      .expect(400);
  });

  it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'qwerty',
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
