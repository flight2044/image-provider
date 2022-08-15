import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('API Endpoints Tests', () => {
  it('Get /processImage with correct image', async () => {
    const response = await request.get(
      '/processImage?imageName=fjord&width=200&height=200'
    );
    expect(response.status).toBe(200);
  }),
    it('Get /processImage with none existing image', async () => {
      const response = await request.get(
        '/processImage?imageName=test&width=200&height=200'
      );
      expect(response.status).toBe(400);
    }),
    it('Get /processImage with correct image but incorrect size', async () => {
      const response = await request.get(
        '/processImage?imageName=fjord&width=0&height=0'
      );
      expect(response.status).toBe(500);
    });
});
