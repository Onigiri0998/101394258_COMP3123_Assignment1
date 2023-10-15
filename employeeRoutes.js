const express = require('express');
const router = express.Router();

// Dummy in-memory database
let employees = [
    { id: 1, name: 'Alice Green', position: 'Engineer' },
    { id: 2, name: 'Bob Brown', position: 'Manager' }
];

// Fetch all employees
router.get('/', (req, res) => {
    res.json(employees);
});

// Add an employee
router.post('/add', (req, res) => {
    const newEmployee = {
        id: employees.length + 1, 
        name: req.body.name,
        position: req.body.position
    };
    employees.push(newEmployee);
    res.json(newEmployee);
});

// Update an employee by ID
router.put('/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(e => e.id === employeeId);
    
    if (employeeIndex !== -1) {
        employees[employeeIndex].name = req.body.name || employees[employeeIndex].name;
        employees[employeeIndex].position = req.body.position || employees[employeeIndex].position;
        res.json(employees[employeeIndex]);
    } else {
        res.status(404).send(`Employee with ID ${req.params.id} not found`);
    }
});

// Delete an employee by ID
router.delete('/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(e => e.id === employeeId);
    
    if (employeeIndex !== -1) {
        employees.splice(employeeIndex, 1);
        res.send(`Employee with ID ${req.params.id} deleted`);
    } else {
        res.status(404).send(`Employee with ID ${req.params.id} not found`);
    }
});

module.exports = router;
