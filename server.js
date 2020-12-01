// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const appName = 'dgstats';
const app = express();

var whitelist = ['http://localhost:4200'];

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
      var whiteListed = (whitelist.filter(function (url) {
        return url.indexOf(origin) > -1;
      }) || []).length > 0;

      // allow all for now
      if (whiteListed) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, `dist/${appName}`)));

// Get our API routes
const cityApi = require('./routes/city');
const pdga = require('./routes/pdga');

// Set our api routes
app.use('/api/city', cityApi);
app.use('/api/pdga', pdga);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `dist/${appName}/index.html`));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 6969;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
