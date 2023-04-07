const router = require('express').Router();
const { User, Post, Comment } = require('../models');
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
		res.render('homepage', {
			posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
				{
					model: Comment,
					attributes: ['id', 'comment_text', 'user_id', 'date_created'],
					include: [
						{
							model: User,
							attributes: ['username'],
						},
					],
				},
			],
		});

		const posts = postData.get({ plain: true });
		res.render('blog', {
			posts,
			comments: posts.comments,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/post', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [{ model: Post }],
		});

		const user = userData.get({ plain: true });
		res.render('post', {
			...user,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/dashboard', withAuth, async (req, res) => {
	try {
		//find the user's post
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [{ model: Post }],
		});

		const user = userData.get({ plain: true });
		res.render('dashboard', {
			...user,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/user-post/:id', withAuth, async (req, res) => {
	try {
		//find the user's post
		const postData = await Post.findByPk(req.params.id);

		const post = postData.get({ plain: true });
		res.render('userPost', {
			post,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('login');
});
module.exports = router;
