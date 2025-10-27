import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../src/app.js';

let server;

beforeAll(() => {
  server = app.listen(0);
});

afterAll(() => {
  server.close();
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'Password123' })
      .expect(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login with correct credentials', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'Password123' })
      .expect(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    await request(server)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'WrongPass' })
      .expect(401);
  });
});
