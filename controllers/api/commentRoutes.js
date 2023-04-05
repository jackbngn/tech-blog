const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../util/auth');

router.post('/:post_id', withAuth, async (req, res) => {
	try {
		const commentData = await Comment.create({
			comment_text: req.body.comment_text,
			user_id: req.session.user_id,
			post_id: req.params.post_id,
		});
		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
