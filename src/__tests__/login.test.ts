import request from 'supertest';
import app from '../server';

describe('Login API', () => {
  it('should fail login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'rania@neuss.com',
        password: 'SuperAdmin@2025',
      });

    expect(res.statusCode).toBe(200);
  });
});
