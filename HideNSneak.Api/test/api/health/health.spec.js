const request = require('supertest');
const app = require('../../../src/app');

describe('health API endpoints', () => {
  const BASE_URI = `/api/v1`;

  test('getting status', async () => {
    // Arrange
    const expected = { status: 'Awyee, API Works!!!' };

    // Act
    const res = await request(app).get(`${BASE_URI}/health`).send();

    // Assert
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toEqual(expected);
  });
});
