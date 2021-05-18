require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const router = require('./interfaces/http/router');
const passport = require('passport');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(router);

module.exports = app;
