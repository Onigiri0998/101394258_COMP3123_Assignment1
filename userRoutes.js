const express = require('express');
const router = express.Router();

// Dummy in-memory database
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

// Fetch all users
router.get('/', (req, res) => {
    res.json(users);
});

// Add a user
router.post('/add', (req, res) => {
    const newUser = {
        id: users.length + 1, // This is a naive way to generate IDs; in real scenarios, databases handle ID generation
        name: req.body.name
    };
    users.push(newUser);
    res.json(newUser);
});

// Update a user by ID
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex].name = req.body.name || users[userIndex].name;
        res.json(users[userIndex]);
    } else {
        res.status(404).send(`User with ID ${req.params.id} not found`);
    }
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.send(`User with ID ${req.params.id} deleted`);
    } else {
        res.status(404).send(`User with ID ${req.params.id} not found`);
    }
});

module.exports = router;
