const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
	try {
		const userData = await User.create(req.body);

		req.session.user_id = userData.id;
		req.session.logged_in = true;

		res.status(201).json(userData);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = router;
