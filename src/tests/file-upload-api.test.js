
const request = require('supertest');
const app = require('../app'); // Assuming your Express app is defined in app.js or similar

describe(File upload API, () => {
  it(should POST [object Object], async () => {
    const response = await request("http://localhost:3000")
      .post('/api/v1/file-upload/upload')
      .set([])
      .send({});

   
      expect(createRes.statusCode).toEqual(200);
      expect(createRes.body.status).toBe(true);
  });
});
