const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const withAuth = require('../../util/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
	try {
		const postBlog = await Post.create({
			...req.body,
			user_id: req.session.user_id,
		});
		console.log(postBlog);
		res.status(200).json(postBlog);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = router;
