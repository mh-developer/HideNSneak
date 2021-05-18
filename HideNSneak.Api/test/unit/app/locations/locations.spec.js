const locationsRepository = require('../../../../src/infra/repositories/locations.repository');
const unitOfWork = require('../../../../src/infra/unit-of-work');
const locationsService = require('../../../../src/app/locations/locations.service');
const { v4 } = require('uuid');

describe('test locations service', () => {
  test('getting all locations', async () => {
    // Arrange
    const locationsRepositoryMock = jest
      .fn(locationsRepository)
      .mockImplementation(() => ({
        getAll: getLocations
      }));
    const unitOfWorkMock = jest.fn(unitOfWork).mockImplementation(() => ({
      locations: locationsRepositoryMock()
    }));
    const locationsServiceInstance = locationsService(unitOfWorkMock());

    // Act
    const data = await locationsServiceInstance.getAll();

    // Assert
    expect(data).toBeDefined();
  });

  test('getting specific locations', async () => {
    // Arrange
    const locationsRepositoryMock = jest
      .fn(locationsRepository)
      .mockImplementation(() => ({
        get: getLocation
      }));
    const unitOfWorkMock = jest.fn(unitOfWork).mockImplementation(() => ({
      locations: locationsRepositoryMock()
    }));
    const locationsServiceInstance = locationsService(unitOfWorkMock());

    // Act
    const data = await locationsServiceInstance.get();

    // Assert
    expect(data).toBeDefined();
    expect(data.lng).toEqual('46.000000');
    expect(data.lat).toEqual('15.000000');
  });
});

const getLocations = () => [
  {
    id: v4(),
    userId: v4(),
    lng: '46.600000',
    lat: '15.600000',
    timestamp: Date.now()
  },
  {
    id: v4(),
    userId: v4(),
    lng: '46.500000',
    lat: '15.500000',
    timestamp: Date.now()
  },
  {
    id: v4(),
    userId: v4(),
    lng: '46.100000',
    lat: '15.100000',
    timestamp: Date.now()
  }
];

const getLocation = () => ({
  id: v4(),
  userId: v4(),
  lng: '46.000000',
  lat: '15.000000',
  timestamp: Date.now()
});
