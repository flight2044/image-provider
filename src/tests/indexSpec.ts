import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('API Endpoints Tests', () => {
  it('Get /getImage with correct image', async () => {
    const response = await request.get(
      '/getImage?img=fjord&width=200&height=200'
    );
    expect(response.status).toBe(200);
  }),
    it('Get /getImage with none existing image', async () => {
      const response = await request.get(
        '/getImage?img=test&width=200&height=200'
      );
      expect(response.status).toBe(400);
    }),
    it('Get /getImage with correct image but incorrect size', async () => {
      const response = await request.get(
        '/getImage?img=fjord&width=0&height=0'
      );
      expect(response.status).toBe(500);
    });
});
