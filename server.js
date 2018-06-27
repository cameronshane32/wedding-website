// server
var sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const app = express();
const http = require('http').Server()
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(sslRedirect());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 5000);

// Our first route
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
// POST route from RSVP form
app.post('/rsvp', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'carlyandshanewedding@gmail.com',
    subject: 'New message from RSVP form at carlyandshane.info',
    text: `${req.body.name} (${req.body.email}) will be attending: ${req.body.attend}` + `, message: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('rsvp-failure');
    }
    else {
      res.redirect('/sucess')
    }
  });
});

app.get('/sucess', function (req, res) {
  res.sendFile(path.join(__dirname + '/sucess.html'));
});

app.use("/css", express.static(__dirname + '/css'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));

// Listen to port
app.listen(app.get('port'), function () {
  console.log('App is listening on port ' + app.get('port'));
});
