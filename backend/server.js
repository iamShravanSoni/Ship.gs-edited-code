const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/admin');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true, // allow credentials
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Use admin routes
app.use('/api', adminRoutes);

// Default route
app.get('/', (req, res) => {
    console.log("Default route");
    res.send("Welcome to the API!");
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
