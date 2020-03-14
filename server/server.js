const path = require('path'); // same as in webpack.config.js

// These 2 lines = "an express application"
const express = require('express');
const app = express(); 

// Now let's customize the express application
// Serve up the public folder and everything inside:
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// read the heroku env variable for the port info OR a specific port on our local machine
const port = process.env.PORT || 3000;

// Need to process all unhandled requests:
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start up the server:
// port 3000 is avail. for dev on all systems = no warnings about using it (for DEV)
app.listen(port, () => {
  console.log('Server is up!');
}); 



