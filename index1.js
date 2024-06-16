const express = require('express');
const app = express();
const port = 3000;

// Middleware to log request details
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Route to respond with "Hello, World!" at the root endpoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route to respond with a JSON object at the /api endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API endpoint!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
