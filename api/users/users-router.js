const express = require('express');
const users = require('./users-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
	const department = req.decodedToken.department;
	try {
		const response = await users.findByDept(department);
		res.status(200).json(response);
	} catch (error) {
		next({ statusCode: 500, message: 'Something went wrong...' });
	}
});

module.exports = router;
