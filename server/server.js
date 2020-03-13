const path = require('path'); // as in webpack.config.js

// These 2 lines = "an express application"
const express = require('express');
const app = express(); 

const publicPath = path.join(__dirname, '..', 'public');


// Now let's customize the express application
// Serve up the public folder and everything inside:
app.use(express.static(publicPath));

// Need to process all unhandled requests:
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start up the server:
// port 3000 is avail. for dev on all systems = no warnings about using it (for DEV)
app.listen(3000, () => {
  console.log('Server is up!');
}); 



