const express = require('express');
const {Connector, Dialer} = require('dialer');
const cors = require('cors');
const bodyParser = require('body-parser')

let app = express();
let c = {
  login: '10641', password: '3578', url: 'https://uni-call.fcc-online.pl',
  num1: '500127424', num2: '503657892'
};
let dialer = new Dialer(new Connector(c.url, c.login, c.password));

// app.use(express.bodyParser());
app.use(cors());
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Utworzono serwis dla focusKurs na porcie 3000!')
});

app.post('/call', function (req, res) {
  console.log('Call service called!')
  console.log(req.body)
  console.log('Nawiazywanie polaczenia miedzy numerami: ' + req.body.first_number + ', ' + req.body.second_number + '...');
  dialer.call(req.body.first_number, req.body.second_number)
  res.json({status: 'initiated', msg: 'Nawiazywanie polaczenia miedzy numerami: ' + req.body.first_number + ', ' + req.body.second_number + '...'})
});
