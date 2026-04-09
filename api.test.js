// api.test.js
const request = require('supertest');
const app = require('./app');

describe('API Endpoints', () => {
  
  // Тест GET /api/status
  describe('GET /api/status', () => {
    test('должен возвращать статус 200 и объект с status: ok', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body.status).toBe('ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  // Тест GET /api/users/:id
  describe('GET /api/users/:id', () => {
    test('должен возвращать пользователя по ID', async () => {
      const response = await request(app)
        .get('/api/users/42')
        .expect(200);
      
      expect(response.body).toEqual({
        id: 42,
        name: 'User 42',
        active: true
      });
    });
  });

  // Тест POST /api/users
  describe('POST /api/users', () => {
    test('должен создавать нового пользователя', async () => {
      const newUser = { name: 'Alice' };
      
      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      
      expect(response.body.name).toBe('Alice');
      expect(response.body.created).toBe(true);
      expect(response.body).toHaveProperty('id');
    });

    test('должен возвращать 400 если имя не указано', async () => {
      await request(app)
        .post('/api/users')
        .send({})
        .expect(400);
    });
  });

});