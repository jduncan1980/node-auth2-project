const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('./middleware/logger');
const handleError = require('./middleware/handle-error-middleware');
const restricted = require('./middleware/restricted-route-middleware');

const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();
server.use(cors()).use(helmet()).use(logger()).use(express.json());

server.use('/api/users', restricted, userRouter);
server.use('/api/auth', authRouter);

server.use(handleError());
server.get('/', (req, res) => {
	res.status(200).json({ message: 'Server is Running.' });
});

module.exports = server;
