/**
 * Server to handle requests to www.kylon.xyz.
 *
 * @module app
 * @requires path
 * @requires express
 * @requires serve-favicon
 *
 */

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const app = express();

/**
 * Initialize static folder for serving files.
 */
app.use(express.static(path.join(__dirname, 'static')));
app.use('/projects', express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')));

/**
 * Request for the root page of website.
 */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});

/**
 * Request for about page.
 */
app.get('/:pageName', function(req, res) {
  var pageName = req.params.pageName;
  if (pageName === "about") {
    res.sendFile(path.join(__dirname, 'static', 'about.html'));
  }
});

/**
 * Request for project page.
 */
app.get('/projects/:title', function(req, res) {
  var title = req.params.title;
  //res.send(path.join(__dirname,  '/static/' + name + '.html'));
  res.sendFile(path.join(__dirname, 'static', title + '.html'));
});

var port = process.env.PORT || 3000;
var listener = app.listen(port, function() {
  let addr = listener.address().address;
  let port = listener.address().port;
  let host = (listener.address().address === '::') ? 'localhost' : addr;
  console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  console.log('Listening on ' + host + ':' + port);
  console.log('Use Ctrl + C to exit');
  console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
});
