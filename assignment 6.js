const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data (replace with database integration as needed)
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

app.use(bodyParser.json());

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET single user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

// POST a new user
app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.json(user);
});

// PUT update existing user
app.put('/api/users/:id', (req, res) => {
  let user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  user.name = req.body.name;
  res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.send('User deleted');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
