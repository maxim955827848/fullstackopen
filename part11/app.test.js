const supertest = require('supertest');
const app = require('./index');
const api = supertest(app);

test('health endpoint returns ok', async () => {
  await api
    .get('/health')
    .expect(200)
    .expect('ok');
});
