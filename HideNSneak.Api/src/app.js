const express = require("express");
const logger = require("morgan");
const router = require("./interfaces/http/router");
require("dotenv").config();

const app = express();

app.disable('x-powered-by')
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

module.exports = app;
