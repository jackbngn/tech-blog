const newBlogHandler = async (event) => {
	event.preventDefault();
	console.log('button clicked');
	const title = document.querySelector('#title').value.trim();
	const content = document.querySelector('#content').value.trim();

	if (title && content) {
		const response = await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify({ title, content }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to post Blog!');
		}
	}
};

document
	.querySelector('.new-blog-form')
	.addEventListener('submit', newBlogHandler);
