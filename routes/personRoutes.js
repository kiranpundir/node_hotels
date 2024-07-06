const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Middleware to parse JSON requests
router.use(express.json());

// Endpoint to create a new person
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Create a new person document using Mongoose model
        const newPerson = new Person(data);

        // Save new person to the database
        const savedPerson = await newPerson.save();

        console.log("Data saved successfully:", savedPerson);
        res.status(200).json(savedPerson); // Respond with the saved person object
    } catch (error) {
        console.error("Error saving person:", error);
        res.status(500).json({ error: 'Internal server error' }); // Handle errors gracefully
    }
});

// Endpoint to get all persons f
router.get('/', async (req, res) => {
    try {
        // Retrieve all persons from the database
        const data = await Person.find();

        console.log("Retrieved persons successfully:", data);
        res.status(200).json(data); // Respond with the retrieved persons array
    } catch (error) {
        console.error("Error retrieving persons:", error.message);
        res.status(500).json({ error: 'Internal server error' }); // Handle errors gracefully
    }
});

// Endpoint to get persons by work type
router.get('/:workType', async (req, res) => {
    const workType = req.params.workType;
    try {
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.error("Error retrieving persons:", error.message);
        res.status(500).json({ error: 'Internal server error' }); // Handle errors gracefully
    }
});


router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        });
        console.log('res updated');
        res.status(200).json(data);
    } catch (error) {
        console.error("Error retrieving persons:", error.message);
        res.status(500).json({ error: 'Internal server error' }); // Handle errors gracefully
    }
});



router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Person deleted');
        res.status(200).json(response);
    } catch (error) {
        console.error("Error deleting person:", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

