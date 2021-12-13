const express = require('express');
const app = express();

// app.use((req, res) => {
//   console.log('Express app get a request');
//   res.send("You get this response from express");
// });

// We coment our above line because once you respond the request it is over, other lines wont run.

// app.get(path, callback func) is the syntax for get requests
app.get('/', (req, res) => {
  res.send('This is your root route');
});
app.get('/cats', (req, res) => {
  res.send('Meow');
});
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
