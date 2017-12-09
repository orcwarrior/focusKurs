const express = require('express');
const {Connector, Dialer} = require('dialer');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();
let c = {
  login: 'XXXXX', password: 'XXXX', url: 'https://uni-call.fcc-online.pl',
  num1: '123456789', num2: '123456789'
};
let dialer = new Dialer(new Connector(c.url, c.login, c.password));


app.listen(3000, function () {
  console.log('Utworzono serwis dla focusKurs na porcie 3000!')
});

// Generic middlewares:
app.use(cors());
app.use(bodyParser.json());

// Call bridges to teraz obiekt słownikowy, gdzie kluczem (nazwą pola) bedzie numer
// do którego było wydzwanianie, a vartoscia bedzie obiekt bridge z zapytania.
// TODO: Usuwanie z mapy bridge'ów połączeń które zostały juz zakończone.
let callBridges = {};

app.post('/call', async function (req, res) {
  console.log('Call service called!');
  console.log(req.body);
  console.log('Nawiazywanie polaczenia miedzy numerami: ' + req.body.first_number + ', ' + req.body.second_number + '...');
  try {
    let bridge = await dialer.call(req.body.first_number, req.body.second_number);
    callBridges[req.body.first_number] = bridge;
    console.log('bridges:', callBridges);
  } catch (dialerError) {
    console.error(dialerError.stack);
    return res.json({
      status: 'ERROR',
      msg: 'Nawiazywanie połaczenia nieudane z powodu wystąpienia błędu',
      err: dialerError.stack
    })
  }
  res.json({
    status: 'SUCCESS',
    msg: 'Nawiazywanie polaczenia miedzy numerami: ' + req.body.first_number + ', ' + req.body.second_number + '...'
  })
});


// Middleware obsługujacy parametr numer dla
app.param('numer', function (req, res, next, numer) {
  req.numer = numer;
  next();
});
app.get('/status/:numer', async function (req, res) {
  // console.log(callBridges);
  if (!callBridges[req.numer])
    return res.json({success: false, status: 'NODE: CALL NOT FOUND'});
  else {
    let status = await bridge.getStatus();
    res.json({success: true, status: status});
    console.log('Zapytanie o status: ' + status)
  }
});
