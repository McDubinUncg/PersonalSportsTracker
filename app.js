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

$(document).ready(function(){
  $('.slideshow').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000
  });
});
