const express = require('express');
const router = express.Router();
const { Post } = require('../../models');

// Create a new post
router.post('/', async (req, res) => {
	try {
		const post = await Post.create(req.body);
		res.status(201).json(post);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = router;
