const express = require('express');
const app = express();
const path = require('path');

// Expess app can use diffrent templating engines but we will use ejs
// run npm i ejs from commandline
//We dont have to require ejs, express will do it behind the scenes for us
//The templates folder is /views as default but you can change it by
//app.set('views', [yourpath])
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.get('/', (req, res) => {
  res.render('home.ejs');
});
// We can pass data to the template by second argument to the render method
app.get('/name', (req, res) => {
  const myname = 'emin'; //This way we can separete logic and view
  res.render('name.ejs', { name: myname }); // This value key pairs can be same name, first one is used in ejs as refrence
});
app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10 + 1);
  res.render('rand.ejs', { rand: num });
});
app.get('/cats', (req, res) => {
  const cats = ['Ronny', 'Jane', 'Jack', 'Mild', 'Wild'];
  res.render('cats.ejs', { cats });
});
// app.use((req, res) => {
//   console.log('Express app get a request');
//   res.send("You get this response from express");
// });

// We coment our above line because once you respond the request it is over, other lines wont run.

// app.get(path, callback func) is the syntax for get requests

app.get('/dogs', (req, res) => {
  res.send('Woof');
});
app.get('/topic/:topicname', (req, res) => {
  const { topicname } = req.params;
  res.send(`You are looking into ${topicname} topic`);
});
//To create generic path for lots of diffrent paths we use columns as above
// /topic/:topicname

app.get('/search', (req, res) => {
  //URL queries is used like www.fakeurl.com/search?query=catnames?sort=descending
  //req.query is all of the queries in the URL ,
  //There might be more than one query in the URL
  //There is 2 queries in the URL above (catnames, sort);
  //Try to go localhost:8080/search/?searchstring= and add anything to the end
  console.log(req.query);
  const { searchstring } = req.query;
  if (!searchstring) {
    res.send('Nothing found if nothing searched');
  } else {
    res.send(`You are searching for ${searchstring}`);
  }
});

app.get('*', (req, res) => {
  res.send('This is for all another routes');
});
//This route should be at the end of the routes because it matches with all routes and rest of routes will be ignored
app.listen(8080, () => {
  console.log('Express app is listening on port 8080');
});
