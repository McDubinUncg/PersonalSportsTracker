const exphbs = require('express-handlebars')
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000;

app.use('/static',express.static(path.join(__dirname, 'static')))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', (req, res) => {
  res.render('home');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/threads', (req, res) => {
  res.render('threads');
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(port)
