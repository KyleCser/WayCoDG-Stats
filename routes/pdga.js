var unirest = require("unirest");
var express = require("express");

const router = express.Router();

router.post('/login', (req, res) => {
  var request = unirest("POST", "https://api.pdga.com/services/json/user/login");

  request.headers({
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  });

  request.send(req.body);

  request.end(function (result) {
    if (result.error) throw new Error(result.error);
    res.json(result.body);
  });
});

router.post('/players', (req, res) => {
  var request = require("request");

  var options = { method: 'GET',
    url: 'https://api.pdga.com/services/json/players',
    qs:
      { first_name: '',
        last_name: '',
        pdga_number: '',
        class: '',
        city: '',
        state_prov: 'MI',
        country: 'US',
        last_modified: '',
        offset: '0',
        limit: '200' },
    headers:
      { 'Postman-Token': '7fda867f-bcf0-4d9b-be08-f4ffcb28985a',
        'Cache-Control': 'no-cache',
        'session_name': 'tWKeEAf0mQypHZMlQcfdlnkvjwyj9pAQQNolYZ3QXdQ',
        'Content-Type': 'application/json' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

module.exports = router;

