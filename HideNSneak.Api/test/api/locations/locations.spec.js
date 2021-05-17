const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/app');
const LocationModel = require('../../../src/domain/locations/location.model');
const { v4 } = require('uuid');

let connection;
const BASE_URI = `/api/v1`;

describe('Test the locations path for GET method', () => {
  test('It should response the GET method for all locations', async () => {
    // Act
    const response = await request(app).get(`${BASE_URI}/locations`).send();

    // Assert
    expect(response.statusCode).toBe(200);
  });

  test('It should response the GET method for specific location', async () => {
    // Arrange
    const location = await LocationModel.findOne({ lng: '46.600000' });
    const param = location._id;

    // Act
    const response = await request(app)
      .get(`${BASE_URI}/locations/${param}`)
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
      lng: '15.233000',
      lat: '45.123000',
      timestamp: Date.now()
    };

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/locations`)
      .send(newLocation);

    // Assert
    expect(response.statusCode).toBe(201);
  });

  test('It should response ERROR for the POST', async () => {
    // Arrange
    const notValidNewLocation = {
      userId: 'fakeUserId',
      // missing lng
      lat: '45.123000',
      timestamp: Date.now()
    };

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/locations`)
      .send(notValidNewLocation);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the locations path for PUT method', () => {
  test('It should response the PUT method for specific location', async () => {
    // Arrange
    const location = await LocationModel.findOne({ lng: '46.600000' });
    const param = location._id;
    const updateLocation = {
      id: location._id,
      userId: location.userId,
      lng: '14.424200',
      lat: location.lat,
      timestamp: Date.now()
    };

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/locations/${param}`)
      .send(updateLocation);

    // Assert
    expect(response.statusCode).toBe(204);
  });

  test('It should response param validation ERROR for the PUT method', async () => {
    // Arrange
    const location = await LocationModel.findOne({ lng: '46.600000' });
    const param = 'fakeLocation';

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/locations/${param}`)
      .send(location);

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test('It should response model validation ERROR for the PUT method', async () => {
    // Arrange
    const location = await LocationModel.findOne({ lng: '46.600000' });
    const param = location._id;
    location.lng = null;

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/locations/${param}`)
      .send(location);

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test('It should response not found ERROR for the PUT method', async () => {
    // Arrange
    const location = await LocationModel.findOne({ lng: '46.600000' });
    const param = 'fakeLocation';
    location.id = param;

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/locations/${param}`)
      .send(location);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the locations path for DELETE method', () => {
  test('It should response success DELETE', async () => {
    // Arrange
    const location = await LocationModel.findOne({ lng: '46.600000' });
    const param = location._id;

    // Act
    const response = await request(app)
      .delete(`${BASE_URI}/locations/${param}`)
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
    lng: '46.600000',
    lat: '15.600000',
    timestamp: Date.now()
  },
  {
    userId: v4(),
    lng: '46.500000',
    lat: '15.500000',
    timestamp: Date.now()
  },
  {
    userId: v4(),
    lng: '46.100000',
    lat: '15.100000',
    timestamp: Date.now()
  }
];
