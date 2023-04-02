const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = router;
