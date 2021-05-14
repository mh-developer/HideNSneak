const request = require('supertest');
const app = require('../../../src/app');

const rootPath = '/api/v1';
let dataHolder = null;

beforeEach(async () => {
  try {
    const newUser = {
      id: null,
      firstname: 'Čupo',
      surname: 'Moting',
      email: 'cupo.moting@mail.com'
    };
    const data = await request(app).post(`${rootPath}/users`).send(newUser);
    dataHolder = data;
  } catch (error) {
    console.log(error);
  }
});

afterEach(async () => {
  try {
    await request(app).delete(`${rootPath}/users/${dataHolder.id}`);
  } catch (error) {
    console.log(error);
  }
});

describe('Test the users path for GET method', () => {
  test('It should response the GET method for all users', async () => {
    try {
      const response = await request(app).get(`${rootPath}/users`);
      expect(response.statusCode).toBe(200);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response the GET method for specific user', async () => {
    try {
      const param = dataHolder.id;
      const response = await request(app).get(`${rootPath}/users/${param}`);
      expect(response.statusCode).toBe(200);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response ERROR for the GET method for wrong param', async () => {
    try {
      const param = Number.MAX_SAFE_INTEGER;
      const response = await request(app).get(`${rootPath}/users/${param}`);
      expect(response.statusCode).toBe(400);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });
});

describe('Test the users path for POST method', () => {
  test('It should response the POST method for created user', async () => {
    try {
      const newUser = {
        id: null,
        firstname: 'Čupo',
        surname: 'Moting',
        email: 'cupo.moting@mail.com'
      };
      const response = await request(app)
        .post(`${rootPath}/users`)
        .send(newUser);
      expect(response.statusCode).toBe(201);

      if (response.statusCode == 201) {
        await request(app).delete(`${rootPath}/users/${response.body.id}`);
      }
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response ERROR for the POST', async () => {
    try {
      const notValidNewUser = {
        id: null,
        firstname: null,
        // missing surname
        email: 'cupo.moting@mail.com'
      };
      const response = await request(app)
        .post(`${rootPath}/users`)
        .send(notValidNewUser);
      expect(response.statusCode).toBe(400);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });
});

describe('Test the users path for PUT method', () => {
  test('It should response the PUT method for specific user', async () => {
    try {
      const param = dataHolder.id;
      dataHolder.firstname = 'Moto';
      const response = await request(app)
        .put(`${rootPath}/users/${param}`)
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
        .put(`${rootPath}/users/${param}`)
        .send(dataHolder);
      expect(response.statusCode).toBe(400);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response model validation ERROR for the PUT method', async () => {
    try {
      const param = dataHolder.id;
      dataHolder.id = null;
      const response = await request(app)
        .put(`${rootPath}/users/${param}`)
        .send(dataHolder);
      expect(response.statusCode).toBe(400);

      dataHolder.id = param;
      dataHolder.firstname = null;
      const response2 = await request(app)
        .put(`${rootPath}/users/${param}`)
        .send(dataHolder);
      expect(response2.statusCode).toBe(400);

      dataHolder.firstname = 'ime';
      dataHolder.surname = null;
      const response3 = await request(app)
        .put(`${rootPath}/users/${param}`)
        .send(dataHolder);
      expect(response3.statusCode).toBe(400);

      dataHolder.surname = 'priimek';
      dataHolder.email = null;
      const response4 = await request(app)
        .put(`${rootPath}/users/${param}`)
        .send(dataHolder);
      expect(response4.statusCode).toBe(400);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response not found ERROR for the PUT method', async () => {
    try {
      const param = Number.MAX_SAFE_INTEGER;
      dataHolder.id = param;
      const response = await request(app)
        .put(`${rootPath}/users/${param}`)
        .send(dataHolder);
      expect(response.statusCode).toBe(404);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });
});

describe('Test the users path for DELETE method', () => {
  test('It should response success DELETE', async () => {
    try {
      const param = dataHolder.id;
      const response = await request(app).delete(`${rootPath}/users/${param}`);
      expect(response.statusCode).toBe(204);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('It should response ERROR not found for DELETE method', async () => {
    try {
      const param = Number.MAX_SAFE_INTEGER;
      const response = await request(app).delete(`${rootPath}/users/${param}`);
      expect(response.statusCode).toBe(404);
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });
});
