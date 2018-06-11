// server
const express = require('express');
const app = express();
const path = require('path');
app.set('port', process.env.PORT || 5000);

// Our first route
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use("/css", express.static(__dirname + '/css'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));

// Listen to port
app.listen(app.get('port'), function () {
  console.log('App is listening on port ' + app.get('port'));
});
