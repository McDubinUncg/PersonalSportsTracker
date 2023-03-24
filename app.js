// Fetch news data
fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=8845aff61b5844de9a896fcddbe33d5e')
  .then(response => response.json())
  .then(data => {
    const article = data.articles[0];
    const headline = article.title;
    document.getElementById('headline').textContent = headline;
  })
  .catch(error => console.error(error));

// Netlify Identity configuration
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/user.html";
      });
    }
  });
}

// Login modal
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeBtn = document.querySelector('.w3-modal-content span');

loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
});
