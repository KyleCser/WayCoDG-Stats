const express = require('express');
const router = express.Router();

/* GET api listing. */
router.post('/:city?', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;

  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'dgstats';

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    const db = client.db(dbName);
    const city = req.params.city;

    let search = {};
    if (city !== undefined && city !== '') {
      search = { city };
    }

    db.collection('cities').find(search, function (findErr, result) {
      if (findErr) throw findErr;
      client.close();

      result.toArray(function(error, result) {
        res.json(result || []);
      });
    });
  });
});

module.exports = router;
