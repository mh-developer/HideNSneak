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
    expect(data.longitude).toEqual(46.0);
    expect(data.latitude).toEqual(15.0);
  });
});

const getLocations = () => [
  {
    id: v4(),
    userId: v4(),
    longitude: 46.6,
    latitude: 15.6,
    timestamp: Date.now()
  },
  {
    id: v4(),
    userId: v4(),
    longitude: 46.5,
    latitude: 15.5,
    timestamp: Date.now()
  },
  {
    id: v4(),
    userId: v4(),
    longitude: 46.1,
    latitude: 15.1,
    timestamp: Date.now()
  }
];

const getLocation = () => ({
  id: v4(),
  userId: v4(),
  longitude: 46.0,
  latitude: 15.0,
  timestamp: Date.now()
});
