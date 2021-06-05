const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/app');
const LocationModel = require('../../../src/domain/locations/location.model');
const UserModel = require('../../../src/domain/users/users.model');
const { v4 } = require('uuid');

let connection;
let token;
const BASE_URI = `/api/v1`;

describe('Test the locations path for GET method', () => {
  test('It should response the GET method for all locations', async () => {
    // Act
    const response = await request(app)
      .get(`${BASE_URI}/locations`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(200);
  });

  test('It should response the GET method for specific location', async () => {
    // Arrange
    const location = await LocationModel.findOne({ longitude: 46.6 });
    const param = location._id;

    // Act
    const response = await request(app)
      .get(`${BASE_URI}/locations/${param}`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(200);
  });

  test('It should response ERROR for the GET method for wrong param', async () => {
    // Arrange
    const param = 'fakeLocation';

    // Act
    const response = await request(app)
      .get(`${BASE_URI}/locations/${param}`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(404);
  });
});

describe('Test the locations path for POST method', () => {
  test('It should response the POST method for created location', async () => {
    // Arrange
    const newLocation = {
      userId: 'fakeUserId',
      longitude: 15.233,
      latitude: 45.123,
      timestamp: Date.now()
    };

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/locations`)
      .set('Authorization', `${token}`)
      .send(newLocation);

    // Assert
    expect(response.statusCode).toBe(201);
  });

  test('It should response ERROR for the POST', async () => {
    // Arrange
    const notValidNewLocation = {
      userId: 'fakeUserId',
      // missing lng
      latitude: 45.123,
      timestamp: Date.now()
    };

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/locations`)
      .set('Authorization', `${token}`)
      .send(notValidNewLocation);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the locations path for PUT method', () => {
  test('It should response the PUT method for specific location', async () => {
    // Arrange
    const location = await LocationModel.findOne({ longitude: 46.6 });
    const param = location._id;
    const updateLocation = {
      id: location._id,
      userId: location.userId,
      longitude: 14.4242,
      latitude: location.latitude,
      timestamp: Date.now()
    };

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/locations/${param}`)
      .set('Authorization', `${token}`)
      .send(updateLocation);

    // Assert
    expect(response.statusCode).toBe(204);
  });

  test('It should response param validation ERROR for the PUT method', async () => {
    // Arrange
    const location = await LocationModel.findOne({ longitude: 46.6 });
    const param = 'fakeLocation';

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/locations/${param}`)
      .set('Authorization', `${token}`)
      .send(location);

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test('It should response model validation ERROR for the PUT method', async () => {
    // Arrange
    const location = await LocationModel.findOne({ longitude: 46.6 });
    const param = location._id;
    location.longitude = null;

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/locations/${param}`)
      .set('Authorization', `${token}`)
      .send(location);

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test('It should response not found ERROR for the PUT method', async () => {
    // Arrange
    const location = await LocationModel.findOne({ longitude: 46.6 });
    const param = 'fakeLocation';
    location.id = param;

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/locations/${param}`)
      .set('Authorization', `${token}`)
      .send(location);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the locations path for DELETE method', () => {
  test('It should response success DELETE', async () => {
    // Arrange
    const location = await LocationModel.findOne({ longitude: 46.6 });
    const param = location._id;

    // Act
    const response = await request(app)
      .delete(`${BASE_URI}/locations/${param}`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(204);
  });

  test('It should response ERROR not found for DELETE method', async () => {
    // Arrange
    const param = 'fakeLocation';

    // Act
    const response = await request(app)
      .delete(`${BASE_URI}/locations/${param}`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(404);
  });
});

beforeAll(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  connection = mongoose.connection;

  const newUser = new UserModel(getUser());
  await newUser.save();

  const credentials = getCredentials();
  const response = await request(app)
    .post(`${BASE_URI}/auth/login`)
    .send(credentials);
  token = `${response.body.schema} ${response.body.access_token}`;
});

beforeEach(async () => {
  const initLocations = getLocations();
  for (const location of initLocations) {
    const newLocation = new LocationModel(location);
    await newLocation.save();
  }
});

afterEach(async () => {
  await LocationModel.deleteMany({});
});

afterAll(async () => {
  await LocationModel.deleteMany({});
  await connection.close();
});

const getLocations = () => [
  {
    userId: v4(),
    longitude: 46.6,
    latitude: 15.6,
    timestamp: Date.now()
  },
  {
    userId: v4(),
    longitude: 46.5,
    latitude: 15.5,
    timestamp: Date.now()
  },
  {
    userId: v4(),
    longitude: 46.1,
    latitude: 15.1,
    timestamp: Date.now()
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
