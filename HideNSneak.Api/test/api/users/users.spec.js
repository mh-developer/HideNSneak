const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/app');
const UserModel = require('../../../src/domain/users/users.model');

let connection;
const BASE_URI = `/api/v1`;

describe('Test the users path for GET method', () => {
  test('It should response the GET method for all users', async () => {
    // Act
    const response = await request(app).get(`${BASE_URI}/users`).send();

    // Assert
    expect(response.statusCode).toBe(200);
  });

  test('It should response the GET method for specific user', async () => {
    // Arrange
    const user = await UserModel.findOne({ lastname: 'Makaroni' });

    // Act
    const response = await request(app)
      .get(`${BASE_URI}/users/${user._id}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(200);
  });

  test('It should response ERROR for the GET method for wrong param', async () => {
    // Arrange
    const param = 'fakeParam';

    // Act
    const response = await request(app)
      .get(`${BASE_URI}/users/${param}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the users path for POST method', () => {
  test('It should response the POST method for created user', async () => {
    // Arrange
    const newUser = {
      name: 'Čupo',
      lastname: 'Moting',
      email: 'cupo.moting@mail.com',
      password: 'fakePassword'
    };

    // Act
    const response = await request(app).post(`${BASE_URI}/users`).send(newUser);

    // Assert
    expect(response.statusCode).toBe(201);
  });

  test('It should response ERROR creating user', async () => {
    // Arrange
    const notValidNewUser = {
      name: 'Čupo',
      // missing lastname
      email: 'cupo.moting@mail.com',
      password: 'fakePassword'
    };

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/users`)
      .send(notValidNewUser);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the users path for PUT method', () => {
  test('It should response the PUT method for specific user', async () => {
    // Arrange
    const user = await UserModel.findOne({ lastname: 'Makaroni' });
    const param = user._id;
    const updateUser = {
      id: user._id,
      name: user.name,
      lastname: 'Moto',
      email: user.email,
      password: user.password
    };

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/users/${param}`)
      .send(updateUser);

    // Assert
    expect(response.statusCode).toBe(204);
  });

  test('It should response param validation ERROR for the PUT method', async () => {
    // Arrange
    const user = await UserModel.findOne({ lastname: 'Makaroni' });
    const param = 'fakeParam';

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/users/${param}`)
      .send(user);

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test('It should response model validation ERROR for the PUT method', async () => {
    // Arrange
    const user = await UserModel.findOne({ lastname: 'Makaroni' });
    const param = user._id;
    user.id = 'fakeParam';

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/users/${param}`)
      .send(user);

    // Assert
    expect(response.statusCode).toBe(400);

    // Arrange
    user.id = param;
    user.name = null;

    // Act
    const response2 = await request(app)
      .put(`${BASE_URI}/users/${param}`)
      .send(user);

    // Assert
    expect(response2.statusCode).toBe(400);

    // Arrange
    user.name = 'fakeName';
    user.lastname = null;

    // Act
    const response3 = await request(app)
      .put(`${BASE_URI}/users/${param}`)
      .send(user);

    // Assert
    expect(response3.statusCode).toBe(400);

    // Arrange
    user.lastname = 'fakeLastname';
    user.email = null;

    // Act
    const response4 = await request(app)
      .put(`${BASE_URI}/users/${param}`)
      .send(user);

    // Assert
    expect(response4.statusCode).toBe(400);
  });

  test('It should response not found ERROR for the PUT method', async () => {
    // Arrange
    const user = await UserModel.findOne({ lastname: 'Makaroni' });
    const param = 'fakeParam';
    user.id = 'fakeParam';

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/users/${param}`)
      .send(user);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the users path for DELETE method', () => {
  test('It should response success DELETE', async () => {
    // Arrange
    const user = await UserModel.findOne({ lastname: 'Makaroni' });

    // Act
    const response = await request(app)
      .delete(`${BASE_URI}/users/${user._id}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(204);
  });

  test('It should response ERROR not found for DELETE method', async () => {
    // Arrange
    const param = 'fakeParam';

    // Act
    const response = await request(app)
      .delete(`${BASE_URI}/users/${param}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

beforeAll(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  connection = mongoose.connection;
});

beforeEach(async () => {
  const initUsers = getUsers();
  for (const user of initUsers) {
    const newUser = new UserModel(user);
    await newUser.save();
  }
});

afterEach(async () => {
  await UserModel.deleteMany({});
});

afterAll(async () => {
  await UserModel.deleteMany({});
  await connection.close();
});

const getUsers = () => [
  {
    name: 'Johnny',
    lastname: 'Makaroni',
    email: 'johnny.makaroni@gmail.com',
    password: 'fakePassword'
  },
  {
    name: 'Cristiano',
    lastname: 'Penaldo',
    email: 'cristiano.penaldo@gmail.com',
    password: 'fakePassword'
  },
  {
    name: 'Lionel',
    lastname: 'Lessi',
    email: 'lionel.lessi@gmail.com',
    password: 'fakePassword'
  },
  {
    name: 'Arturo',
    lastname: 'Zidar',
    email: 'arturo.zidar@gmail.com',
    password: 'fakePassword'
  }
];
