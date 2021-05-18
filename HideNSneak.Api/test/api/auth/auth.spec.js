const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/app');
const UserModel = require('../../../src/domain/users/users.model');

let connection;
const BASE_URI = `/api/v1`;

describe('Test the auth path for Login method', () => {
  test('It should response successfully login', async () => {
    // Arrange
    const credentials = getCredentials();

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/auth/login`)
      .send(credentials);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('refresh_token');
    expect(response.body).toHaveProperty('schema');
    expect(response.body.schema).toEqual('Bearer');
  });

  test('It should response ERROR for Login method for wrong credentials', async () => {
    // Arrange
    const credentials = getCredentials();
    credentials.password = 'fakeNotExisist';

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/auth/login`)
      .send(credentials);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the auth path for Register method', () => {
  test('It should response successfully register', async () => {
    // Arrange
    const user = getUser();

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/auth/register`)
      .send(user);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  test('It should response ERROR for Register method for wrong parameters', async () => {
    // Arrange
    const user = getUser();
    user.password = '';

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/auth/register`)
      .send(user);

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

const getUser = () => ({
  name: 'Johnny',
  lastname: 'Makaroni',
  email: 'johnny.makaroni@gmail.com',
  password: 'fakePassword'
});

const getCredentials = () => ({
  email: 'johnny.makaroni@gmail.com',
  password: 'fakePassword'
});
