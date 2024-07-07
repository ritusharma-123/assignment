const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const secretKey = 'your_secret_key'; // Replace with a strong secret key

// Middleware to parse JSON body
app.use(bodyParser.json());

// Mock user data (this could be from a database)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Login endpoint to generate JWT
app.post('/api/login', (req, res) => {
    // Mock authentication (replace with database query)
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Generate JWT token with user payload and secret key
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
    // If token is verified, send back protected data
    res.json({ message: 'This is a protected route!' });
});

// Verify JWT middleware
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');

        // Get token from array
        const token = bearer[1];

        // Verify token
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.sendStatus(403); // Forbidden
            } else {
                req.user = decoded; // Set the decoded payload onto the request object
                next(); // Move to next middleware
            }
        });

    } else {
        // Forbidden if no token
        res.sendStatus(403);
    }
}

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
