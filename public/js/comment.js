const newCommentHandler = async (event) => {
	event.preventDefault();
	console.log('comment created');
	const comment = document.querySelector('#comment-text').value.trim();

	if (comment) {
		const postId = window.location.pathname.split('/').pop();
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

const deleteButtons = document.querySelectorAll('.delete-comment');

deleteButtons.forEach((button) => {
	button.addEventListener('click', async (event) => {
		event.preventDefault();
		const commentId = button.getAttribute('data-href');
		console.log('Deleting comment with ID', commentId);

		const response = await fetch(`/api/comments/${commentId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert(response.statusText);
		}
	});
});
