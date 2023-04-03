if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/user.html";
      });
    }
  });
}

const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Query the hyperlinks table and generate HTML for the links
const getHyperlinks = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM hyperlinks', (err, results) => {
      if (err) {
        reject(err);
      } else {
        const html = results.map(result => `<a href="${result.url}">${result.name}</a>`).join('');
        resolve(html);
      }
    });
  });
};

// Example usage
getHyperlinks().then(html => {
  console.log(html);
  // Use the generated HTML to display the links on the website
}).catch(err => {
  console.error(err);
});
