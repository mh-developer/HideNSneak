const usersRepository = require('../../../../src/infra/repositories/users.repository');
const unitOfWork = require('../../../../src/infra/unit-of-work');
const usersService = require('../../../../src/app/users/users.service');
const { v4 } = require('uuid');

describe('test users service', () => {
  test('getting all users', async () => {
    // Arrange
    const usersRepositoryMock = jest
      .fn(usersRepository)
      .mockImplementation(() => ({
        getAll: getUsers
      }));
    const unitOfWorkMock = jest.fn(unitOfWork).mockImplementation(() => ({
      users: usersRepositoryMock()
    }));
    const usersServiceInstance = usersService(unitOfWorkMock());

    // Act
    const data = await usersServiceInstance.getAll();

    // Assert
    expect(data).toBeDefined();
  });

  test('getting specific user', async () => {
    // Arrange
    const usersRepositoryMock = jest
      .fn(usersRepository)
      .mockImplementation(() => ({
        get: getUser
      }));
    const unitOfWorkMock = jest.fn(unitOfWork).mockImplementation(() => ({
      users: usersRepositoryMock()
    }));
    const usersServiceInstance = usersService(unitOfWorkMock());

    // Act
    const data = await usersServiceInstance.get();

    // Assert
    expect(data).toBeDefined();
    expect(data.Name).toEqual('fakeName');
  });
});

const getUsers = () => [
  {
    id: v4(),
    name: 'Johnny',
    lastname: 'Makaroni',
    email: 'johnny.makaroni@gmail.com'
  },
  {
    id: v4(),
    name: 'Cristiano',
    lastname: 'Penaldo',
    email: 'cristiano.penaldo@gmail.com'
  },
  {
    id: v4(),
    name: 'Lionel',
    lastname: 'Lessi',
    email: 'lionel.lessi@gmail.com'
  },
  {
    id: v4(),
    name: 'Arturo',
    lastname: 'Zidar',
    email: 'arturo.zidar@gmail.com'
  }
];

const getUser = () => ({
  id: v4(),
  name: 'fakeName',
  lastname: 'Makaroni',
  email: 'johnny.makaroni@gmail.com'
});
