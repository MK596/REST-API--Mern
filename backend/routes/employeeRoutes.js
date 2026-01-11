const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// @route   GET /employees/allemployees
// @desc    Get all employees
router.get('/allemployees', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /employees/add-emp
// @desc    Add new employee
router.post('/add-emp', async (req, res) => {
    const { name, email, phone, city } = req.body;

    try {
        let employee = new Employee({
            name,
            email,
            phone,
            city
        });

        await employee.save();
        res.json(employee);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /employees/update/:id
// @desc    Update employee
router.put('/update/:id', async (req, res) => {
    const { name, email, phone, city } = req.body;

    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: { name, email, phone, city } },
            { new: true }
        );

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /employees/delete/:id
// @desc    Delete employee
router.delete('/delete/:id', async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        await Employee.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
