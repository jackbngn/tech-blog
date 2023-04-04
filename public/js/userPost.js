const postBars = document.querySelectorAll('.post-bar');

postBars.forEach((postBar) => {
	postBar.addEventListener('click', () => {
		const postUrl = postBar.getAttribute('data-href');
		window.location.href = postUrl;
	});
});
