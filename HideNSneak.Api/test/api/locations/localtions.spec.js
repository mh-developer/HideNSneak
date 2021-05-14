const request = require('supertest');
const app = require('../../../src/app');

const rootPath = '/api/v1';
let dataHolder = null;

beforeEach(async () => {
  try {
    const newLocation = {
      id: null,
      userId: '1',
      longitude: '15.233',
      latitude: '45.123',
      timestamp: Date.now()
    };
    const data = await request(app)
      .post(`${rootPath}/locations`)
      .send(newLocation);
    dataHolder = data;
  } catch (error) {
    console.log(error);
  }
});

afterEach(async () => {
  try {
    await request(app).delete(`${rootPath}/locations/${dataHolder.id}`);
  } catch (error) {
    console.log(error);
  }
});

describe('Test the locations path for GET method', () => {
  test('It should response the GET method for all locations', async () => {
    try {
      const response = await request(app).get(`${rootPath}/locations`);
      expect(response.statusCode).toBe(200);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response the GET method for specific location', async () => {
    try {
      const param = dataHolder.id;
      const response = await request(app).get(`${rootPath}/locations/${param}`);
      expect(response.statusCode).toBe(200);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response ERROR for the GET method for wrong param', async () => {
    try {
      const param = Number.MAX_SAFE_INTEGER;
      const response = await request(app).get(`${rootPath}/locations/${param}`);
      expect(response.statusCode).toBe(400);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });
});

describe('Test the locations path for POST method', () => {
  test('It should response the POST method for created location', async () => {
    try {
      const newLocation = {
        id: null,
        userId: '1',
        longitude: '15.233',
        latitude: '45.123',
        timestamp: Date.now()
      };
      const response = await request(app).post('/locations').send(newLocation);
      expect(response.statusCode).toBe(201);

      if (response.statusCode == 201) {
        await request(app).delete(`${rootPath}/locations/${response.body.id}`);
      }
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response ERROR for the POST', async () => {
    try {
      const notValidNewLocation = {
        id: null,
        userId: '1',
        // missing longitude
        latitude: '45.123',
        timestamp: Date.now()
      };
      const response = await request(app)
        .post('/locations')
        .send(notValidNewLocation);
      expect(response.statusCode).toBe(400);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });
});

describe('Test the locations path for PUT method', () => {
  test('It should response the PUT method for specific location', async () => {
    try {
      const param = dataHolder.id;
      dataHolder.longitude = '14.4242';
      const response = await request(app)
        .put(`${rootPath}/locations/${param}`)
        .send(dataHolder);
      expect(response.statusCode).toBe(204);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response param validation ERROR for the PUT method', async () => {
    try {
      const param = Number.MAX_SAFE_INTEGER;
      const response = await request(app)
        .put(`${rootPath}/locations/${param}`)
        .send(dataHolder);
      expect(response.statusCode).toBe(400);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response model validation ERROR for the PUT method', async () => {
    try {
      const param = dataHolder.id;
      dataHolder.longitude = null;
      const response = await request(app)
        .put(`${rootPath}/locations/${param}`)
        .send(dataHolder);
      expect(response.statusCode).toBe(400);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response not found ERROR for the PUT method', async () => {
    try {
      const param = Number.MAX_SAFE_INTEGER;
      dataHolder.id = param;
      const response = await request(app)
        .put(`${rootPath}/locations/${param}`)
        .send(dataHolder);
      expect(response.statusCode).toBe(404);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });
});

describe('Test the locations path for DELETE method', () => {
  test('It should response success DELETE', async () => {
    try {
      const param = dataHolder.id;
      const response = await request(app).delete(
        `${rootPath}/locations/${param}`
      );
      expect(response.statusCode).toBe(204);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response ERROR not found for DELETE method', async () => {
    try {
      const param = Number.MAX_SAFE_INTEGER;
      const response = await request(app).delete(
        `${rootPath}/locations/${param}`
      );
      expect(response.statusCode).toBe(404);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });
});
