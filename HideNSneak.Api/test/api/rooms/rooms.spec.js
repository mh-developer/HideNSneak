const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/app');
const RoomModel = require('../../../src/domain/rooms/room.model');
const UserModel = require('../../../src/domain/users/users.model');
const { v4 } = require('uuid');

let connection;
let token;
const BASE_URI = `/api/v1`;

describe('Test the rooms path for GET method', () => {
  test('It should response the GET method for all rooms', async () => {
    // Act
    const response = await request(app)
      .get(`${BASE_URI}/rooms`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(200);
  });

  test('It should response the GET method for specific room', async () => {
    // Arrange
    const room = await RoomModel.findOne({ name: 'HideNSneak' });
    const param = room._id;

    // Act
    const response = await request(app)
      .get(`${BASE_URI}/rooms/${param}`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(200);
  });

  test('It should response ERROR for the GET method for wrong param', async () => {
    // Arrange
    const param = 'fakeRoom';

    // Act
    const response = await request(app)
      .get(`${BASE_URI}/rooms/${param}`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the rooms path for POST method', () => {
  test('It should JOIN current user to for specific room', async () => {
    // Arrange
    const room = await RoomModel.findOne({ name: 'HideNSneak' });
    const joinCode = room.joinCode;

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/rooms/join/${joinCode}`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body.joinCode).toBe(joinCode);
    expect(response.body).toHaveProperty('currentPlayers');
    expect(response.body.currentPlayers).toBeDefined();
  });
});

describe('Test the rooms path for POST method', () => {
  test('It should QUIT current user to for specific room', async () => {
    // Arrange
    const room = await RoomModel.findOne({ name: 'HideNSneak' });
    const joinCode = room.joinCode;

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/rooms/quit/${joinCode}`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body.joinCode).toBe(joinCode);
  });
});

describe('Test the rooms path for POST method', () => {
  test('It should response the POST method for created room', async () => {
    // Arrange
    const newRoom = {
      name: 'fakeRoom',
      owner: require('mongoose').Types.ObjectId(),
      maxPlayers: 10,
      currentPlayers: [v4(), v4()]
    };

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/rooms`)
      .set('Authorization', `${token}`)
      .send(newRoom);

    // Assert
    expect(response.statusCode).toBe(201);
  });

  test('It should response ERROR for the POST', async () => {
    // Arrange
    const notValidNewRoom = {
      name: 'fakeRoom',
      owner: require('mongoose').Types.ObjectId(),
      // missing maxPlayers
      currentPlayers: [v4(), v4()]
    };

    // Act
    const response = await request(app)
      .post(`${BASE_URI}/rooms`)
      .set('Authorization', `${token}`)
      .send(notValidNewRoom);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the rooms path for PUT method', () => {
  test('It should response the PUT method for specific room', async () => {
    // Arrange
    const room = await RoomModel.findOne({ name: 'HideNSneak' });
    const param = room._id;
    const updateRoom = {
      id: room._id,
      name: room.name,
      owner: room.owner,
      maxPlayers: 16,
      currentPlayers: room.currentPlayers
    };

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/rooms/${param}`)
      .set('Authorization', `${token}`)
      .send(updateRoom);

    // Assert
    expect(response.statusCode).toBe(204);
  });

  test('It should response param validation ERROR for the PUT method', async () => {
    // Arrange
    const room = await RoomModel.findOne({ name: 'HideNSneak' });
    const param = 'fakeRoom';

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/rooms/${param}`)
      .set('Authorization', `${token}`)
      .send(room);

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test('It should response model validation ERROR for the PUT method', async () => {
    // Arrange
    const room = await RoomModel.findOne({ name: 'HideNSneak' });
    const param = room._id;
    room.name = null;

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/rooms/${param}`)
      .set('Authorization', `${token}`)
      .send(room);

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test('It should response not found ERROR for the PUT method', async () => {
    // Arrange
    const room = await RoomModel.findOne({ name: 'HideNSneak' });
    const param = 'fakeRoom';
    room.id = param;

    // Act
    const response = await request(app)
      .put(`${BASE_URI}/rooms/${param}`)
      .set('Authorization', `${token}`)
      .send(room);

    // Assert
    expect(response.statusCode).toBe(400);
  });
});

describe('Test the rooms path for DELETE method', () => {
  test('It should response success DELETE', async () => {
    // Arrange
    const room = await RoomModel.findOne({ name: 'HideNSneak' });
    const param = room._id;

    // Act
    const response = await request(app)
      .delete(`${BASE_URI}/rooms/${param}`)
      .set('Authorization', `${token}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(204);
  });

  test('It should response ERROR not found for DELETE method', async () => {
    // Arrange
    const param = 'fakeRoom';

    // Act
    const response = await request(app)
      .delete(`${BASE_URI}/rooms/${param}`)
      .set('Authorization', `${token}`)
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

  const newUser = new UserModel(getUser());
  await newUser.save();

  const credentials = getCredentials();
  const response = await request(app)
    .post(`${BASE_URI}/auth/login`)
    .send(credentials);
  token = `${response.body.schema} ${response.body.access_token}`;
});

beforeEach(async () => {
  const initRooms = getRooms();
  for (const room of initRooms) {
    const newRoom = new RoomModel(room);
    await newRoom.save();
  }
});

afterEach(async () => {
  await RoomModel.deleteMany({});
});

afterAll(async () => {
  await RoomModel.deleteMany({});
  await connection.close();
});

const getRooms = () => [
  {
    name: 'HideNSneak',
    owner: require('mongoose').Types.ObjectId(),
    maxPlayers: 10,
    joinCode: '123456',
    currentPlayers: [v4(), v4()],
    timestamp: Date.now()
  },
  {
    name: 'fakeName',
    owner: require('mongoose').Types.ObjectId(),
    maxPlayers: 10,
    joinCode: '111111',
    currentPlayers: [v4(), v4()],
    timestamp: Date.now()
  },
  {
    name: 'fakeName2',
    owner: require('mongoose').Types.ObjectId(),
    maxPlayers: 10,
    joinCode: '222222',
    currentPlayers: [v4(), v4()],
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
