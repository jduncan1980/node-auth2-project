const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { isValidRegistration, isValidLogin } = require('./validUser');
const users = require('../users/users-model');

const generateToken = (user) => {
	const payload = {
		subject: user.id,
		username: user.username,
		department: user.department,
	};
	const secret = process.env.JWT_SECRET || 'fda2weea/* 322s */';
	const options = {
		expiresIn: process.env.TOKEN_EXP || '1d',
	};

	const token = jwt.sign(payload, secret, options);
	return token;
};

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body;

	if (isValidLogin(req.body)) {
		try {
			const user = await users.findByUsername(username);
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ message: `Welcome, ${username}`, token });
			} else {
				next({ statusCode: 401, message: 'Invalid Credentials' });
			}
		} catch (error) {
			next({ statusCode: 500, message: 'Something went wrong...', error });
		}
	} else {
		next({ statusCode: 400, message: 'Missing Login Data.' });
	}
});

router.post('/register', async (req, res, next) => {
	const user = req.body;
	if (isValidRegistration(user)) {
		const rounds = parseInt(process.env.ROUNDS);
		const hash = bcrypt.hashSync(user.password, rounds || 8);
		user.password = hash;

		try {
			const response = await users.add(user);
			res.status(201).json(response);
		} catch (error) {
			next({ statusCode: 500, message: 'Something went wrong, try again...' });
		}
	} else {
		next({ statusCode: 400, message: 'Missing Registration Data.' });
	}
});

module.exports = router;
