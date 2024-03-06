const fs = require('fs');
const path = require('path');

const postmanJsonFile = 'src/Development.postman_collection.json'; // Path to your Postman JSON file
const testDir = 'src/tests'; // Directory where you want to save your test files

// Read the Postman JSON file
const postmanJson = JSON.parse(fs.readFileSync(postmanJsonFile, 'utf8'));

// Helper function to convert a string to a valid JavaScript variable name
const toValidVariableName = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
};

// Iterate over the items in the Postman collection
postmanJson.item.forEach(folder => {
  folder.item.forEach(item => {
    console.log(item)
    if (item.request) {
      const request = item.request;
      const testName = toValidVariableName(item.name);
      const testFileName = `${testName}.test.js`;
      const testFilePath = path.join(testDir, testFileName);

      const apiUrl = request.url.raw.split('/api')[1];

      console.log(apiUrl,"URL")



      // Generate Jest test case for the request
      const testCase = `
const request = require('supertest');
const app = require('../app'); // Assuming your Express app is defined in app.js or similar

describe(${item.name}, () => {
  it(should ${request.method} ${request.url}, async () => {
    const response = await request("http://localhost:3000")
      .${request.method.toLowerCase()}('/api${apiUrl}')
      .set(${JSON.stringify(request.header || {})})
      .send(${JSON.stringify(request.body?.raw || {})});

   
      expect(createRes.statusCode).toEqual(200);
      expect(createRes.body.status).toBe(true);
  });
});
`;

      // Write the test case to a test file
      fs.writeFileSync(testFilePath, testCase);
      console.log(`Test case written to ${testFilePath}`);
    }
  });
});
