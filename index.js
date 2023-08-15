const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); // Import routes index module

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware for all routes

// Use the routes module
app.use('/api/v1', routes);

// ... Other route handlers ...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
