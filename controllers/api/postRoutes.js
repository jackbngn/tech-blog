const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../../models');
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

//update users post
router.put('/user-post/:id', withAuth, async (req, res) => {
	try {
		const updatePost = await Post.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).json(updatePost);
	} catch (err) {
		res.status(500).json(err);
	}
});

//delete users post
router.delete('/user-post/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.destroy({
			where: { id: req.params.id },
		});

		if (!postData) {
			res.status(404).json({ message: 'No post was found' });
			return;
		}
		res.status(200).json({ message: 'Post was deleted!' });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
