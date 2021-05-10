const unitOfWork = require("../../infra/unit-of-work");
const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "devModeSecret";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "devModeRefresh";
let refreshTokens = [];
const users = [
    {
        username: "john",
        password: "password123admin",
        role: "admin",
    },
    {
        username: "anna",
        password: "password123member",
        role: "member",
    },
];

const login = (username, password) => {
    // TODO: need connect with DB

    const user = users.find((u) => {
        return u.username === username && u.password === password;
    });

    const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        accessTokenSecret,
        { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
        { username: user.username, role: user.role },
        refreshTokenSecret
    );

    refreshTokens.push(refreshToken);
    return { accessToken, refreshToken };
};

const register = (data) => {
    // TODO
};

const logout = (token) => {
    // TODO

    refreshTokens = refreshTokens.filter((t) => t !== token);
};

const refreshToken = (user) => {
    // TODO
    const accessToken = jwt.sign(
        { username: user.username },
        accessTokenSecret,
        { expiresIn: "20m" }
    );
    return { accessToken };
};

const usersService = {
    login,
    register,
    logout,
    refreshToken,
};

module.exports = usersService;
