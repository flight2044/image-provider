import httpMocks from 'node-mocks-http';
import imgProcessor from '../../utilities/imageProcessor';

describe('Process image Middlware Tests', () => {
  const res = httpMocks.createResponse();
  it('Process image with valid image', async () => {
    const req = httpMocks.createRequest({
      params: { img: 'fjord', width: '400', height: '200' }
    });
    imgProcessor(req, res, () => {
      expect(res.status).toEqual(200);
    });
  }),
    it('Process image with invalid image', async () => {
      const req = httpMocks.createRequest({
        params: { img: 'test', width: '400', height: '200' }
      });
      imgProcessor(req, res, () => {
        expect(res.status).toEqual(400);
      });
    }),
    it('Process image with invalid dimension parameters', async () => {
      const req = httpMocks.createRequest({
        params: { img: 'test', width: '0', height: '0' }
      });
      imgProcessor(req, res, () => {
        expect(res.status).toEqual(500);
      });
    });
});
