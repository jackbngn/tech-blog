const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../util/auth');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});
		const posts = postData.map((post) => post.get({ plain: true }));
		console.log(postData);
		res.render('homepage', {
			posts,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
