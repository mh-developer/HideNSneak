const usersRepository = require('../../../../src/infra/repositories/users.repository');
const unitOfWork = require('../../../../src/infra/unit-of-work');
const authService = require('../../../../src/app/auth/auth.service');
const { v4 } = require('uuid');

describe('test auth service', () => {
  test('login existing user', async () => {
    // Arrange
    const unitOfWorkMock = jest.fn(unitOfWork);
    const authServiceInstance = authService(unitOfWorkMock);
    const existingUser = getUser();

    // Act
    const data = await authServiceInstance.login(existingUser);

    // Assert
    expect(data).toBeDefined();
    expect(data).toHaveProperty('access_token');
    expect(data).toHaveProperty('refresh_token');
    expect(data).toHaveProperty('schema');
    expect(data.schema).toEqual('Bearer');
  });
});

describe('test auth service', () => {
  test('register new user', async () => {
    // Arrange
    const usersRepositoryMock = jest
      .fn(usersRepository)
      .mockImplementation(() => ({
        create: getUser
      }));
    const unitOfWorkMock = jest.fn(unitOfWork).mockImplementation(() => ({
      users: usersRepositoryMock()
    }));
    const authServiceInstance = authService(unitOfWorkMock());
    const newUser = getRegisterUser();

    // Act
    const data = await authServiceInstance.register(newUser);

    // Assert
    expect(data).toBeDefined();
  });
});

const getUser = () => ({
  id: v4(),
  name: 'fakeName',
  lastname: 'Makaroni',
  email: 'johnny.makaroni@gmail.com',
  password: 'fakePassword'
});

const getRegisterUser = () => ({
  name: 'fakeName',
  lastname: 'Makaroni',
  email: 'johnny.makaroni@gmail.com',
  password: 'fakePassword'
});
