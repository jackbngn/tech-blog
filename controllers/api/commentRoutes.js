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

router.delete('/:id', withAuth, async (req, res) => {
	try {
		const comment = await Comment.findByPk(req.params.id);
		if (!comment) {
			res.status(404).json({ message: 'Comment not found' });
			return;
		}
		if (comment.user_id !== req.session.user_id) {
			res
				.status(403)
				.json({ message: 'You are not authorized to delete this comment' });
			return;
		}
		await Comment.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ message: 'Comment deleted successfully' });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
