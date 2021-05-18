const roomsRepository = require('../../../../src/infra/repositories/rooms.repository');
const unitOfWork = require('../../../../src/infra/unit-of-work');
const roomsService = require('../../../../src/app/rooms/rooms.service');
const { v4 } = require('uuid');

describe('test rooms service', () => {
  test('getting all rooms', async () => {
    // Arrange
    const roomsRepositoryMock = jest
      .fn(roomsRepository)
      .mockImplementation(() => ({
        getAll: getRooms
      }));
    const unitOfWorkMock = jest.fn(unitOfWork).mockImplementation(() => ({
      rooms: roomsRepositoryMock()
    }));
    const roomsServiceInstance = roomsService(unitOfWorkMock());

    // Act
    const data = await roomsServiceInstance.getAll();

    // Assert
    expect(data).toBeDefined();
  });

  test('getting specific rooms', async () => {
    // Arrange
    const roomsRepositoryMock = jest
      .fn(roomsRepository)
      .mockImplementation(() => ({
        get: getRoom
      }));
    const unitOfWorkMock = jest.fn(unitOfWork).mockImplementation(() => ({
      rooms: roomsRepositoryMock()
    }));
    const roomsServiceInstance = roomsService(unitOfWorkMock());

    // Act
    const data = await roomsServiceInstance.get();

    // Assert
    expect(data).toBeDefined();
    expect(data.joinCode).toEqual('333333');
    expect(data.maxPlayers).toEqual(10);
  });
});

const getRooms = () => [
  {
    id: v4(),
    name: 'HideNSneak',
    owner: v4(),
    maxPlayers: 10,
    joinCode: '123456',
    currentPlayers: [v4(), v4()],
    timestamp: Date.now()
  },
  {
    id: v4(),
    name: 'fakeName',
    owner: v4(),
    maxPlayers: 10,
    joinCode: '111111',
    currentPlayers: [v4(), v4()],
    timestamp: Date.now()
  },
  {
    id: v4(),
    name: 'fakeName2',
    owner: v4(),
    maxPlayers: 10,
    joinCode: '222222',
    currentPlayers: [v4(), v4()],
    timestamp: Date.now()
  }
];

const getRoom = () => ({
  id: v4(),
  name: 'HideNSneak',
  owner: v4(),
  maxPlayers: 10,
  joinCode: '333333',
  currentPlayers: [v4(), v4()],
  timestamp: Date.now()
});
