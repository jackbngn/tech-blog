const editPostFormHandler = async (event) => {
	event.preventDefault();
	console.log('Edit post button clicked!');

	const title = document.querySelector('#title').value.trim();
	const content = document.querySelector('#content').value.trim();
	const postId = window.location.pathname.split('/').pop();

	if (title && content) {
		const response = await fetch(`/api/posts/user-post/${postId}`, {
			method: 'PUT',
			body: JSON.stringify({ title, content }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace(`/post/${postId}`);
		} else {
			alert(response.statusText);
		}
	}
};

const deletePostFormHandler = async (event) => {
	event.preventDefault();
	console.log('Delete post button clicked!');

	const postId = window.location.pathname.split('/').pop();

	const response = await fetch(`/api/posts/user-post/${postId}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert(response.statusText);
	}
};

document
	.querySelector('#edit-post-form')
	.addEventListener('submit', editPostFormHandler);

document
	.querySelector('#delete-button')
	.addEventListener('click', deletePostFormHandler);
