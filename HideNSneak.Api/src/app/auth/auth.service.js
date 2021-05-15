const unitOfWork = require('../../infra/unit-of-work');
const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'devModeSecret';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'devModeRefresh';

const login = async user => {
  const data = { id: user.id, email: user.email };
  const accessToken = jwt.sign({ user: data }, accessTokenSecret, {
    expiresIn: '20m'
  });
  const refreshTokenJwt = jwt.sign({ id: user.id }, refreshTokenSecret);

  return { access_token: accessToken, refresh_token: refreshTokenJwt };
};

const register = async data => {
  return await unitOfWork.users.create(data);
};

const logout = async refreshToken => {
  // TODO: remove saved refresh token
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};

const refreshToken = (user, oldRefreshToken) => {
  // TODO: refresh token should be saved and verified from db

  jwt.verify(oldRefreshToken, refreshTokenSecret, (err, token) => {
    if (err) {
      throw new Error('Forbidden');
    }
    const data = { id: user.id, email: user.email };
    const accessToken = jwt.sign({ user: data }, accessTokenSecret, {
      expiresIn: '20m'
    });
    const refreshTokenJwt = jwt.sign({ id: user.id }, refreshTokenSecret);

    return { access_token: accessToken, refresh_token: refreshTokenJwt };
  });
};

const usersService = {
  login,
  register,
  logout,
  refreshToken
};

module.exports = usersService;
