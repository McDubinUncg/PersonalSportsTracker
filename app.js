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
