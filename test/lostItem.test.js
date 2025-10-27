import request from 'supertest';
import { app } from '../src/app.js';

describe('LostItem API', () => {
  test('should create a new lost item', async () => {
    const newItem = { name: 'Wallet', description: 'Black leather wallet', location: 'Lobby' };
    const response = await request(app).post('/api/lost-items').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newItem);
    expect(response.body).toHaveProperty('id');
  });

  test('should retrieve a lost item by id', async () => {
    const newItem = { name: 'Keys', description: 'Set of house keys', location: 'Gym' };
    const createRes = await request(app).post('/api/lost-items').send(newItem);
    const id = createRes.body.id;
    const getRes = await request(app).get(`/api/lost-items/${id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body).toMatchObject({ ...newItem, id });
  });
});