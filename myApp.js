const express = require('express');
const app = express();
const helmet = require('helmet');  // Import helmet before using it
// Use helmet middleware
app.use(helmet.hidePoweredBy());
app.disable('x-powered-by');
app.use(helmet());

// Add the frameguard middleware with the configuration object
app.use(helmet.frameguard({ action: 'deny' }));

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
