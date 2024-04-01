const express = require('express');
const app = express();
const helmet = require('helmet');  // Import helmet before using it
// Use helmet middleware
// Define the max age in seconds (90 days)
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// Configure helmet.hsts() to use HTTPS for the next 90 days
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true, // Override Gitpod's settings
  })
);
app.use(helmet.hidePoweredBy());
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});
app.use(helmet());
app.use(helmet.ieNoOpen())

// Add the frameguard middleware with the configuration object
app.use(helmet.frameguard({ action: 'deny' }));

app.use(helmet.xssFilter());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});














































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
