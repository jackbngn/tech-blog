const newCommentHandler = async (event) => {
	event.preventDefault();
	console.log('comment created');
	const comment = document.querySelector('#comment-text').value.trim();

	if (comment) {
		const postId = window.location.pathname.split('/')[2];
		const response = await fetch(`/api/comments/${postId}`, {
			method: 'POST',
			body: JSON.stringify({ comment_text: comment }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert('Comment failed');
		}
	}
};

document
	.querySelector('#comment')
	.addEventListener('submit', newCommentHandler);
