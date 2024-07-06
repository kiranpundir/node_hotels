const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db'); // Make sure this connects to your MongoDB instance
require('dotenv').config();
// const menuRoutes =require('./routes/menuRoutes')
const personRoutes=require('./routes/personRoutes')
app.use('/person',personRoutes)
// app.use('/menu',menuRoutes)
app.use(bodyParser.json());

app.use(bodyParser.json());










// Endpoint to create a new person
app.post('/menu', async (req, res) => {
    try {
        const data = req.body;

        // Create a new menu item document using Mongoose model
        const newMenu = new Menu(data);

        // Save new menu item to the database
        const savedMenu = await newMenu.save();

        console.log("Data saved successfully:", savedMenu);
        res.status(200).json(savedMenu); // Respond with the saved menu item object
    } catch (error) {
        console.error("Error saving menu item:", error);
        res.status(500).json({ error: 'Internal server error' }); // Handle errors gracefully
    }
});




// Endpoint to get all persons
app.get('/menu', async (req, res) => {
    try {
        // Retrieve all menu items from the database
        const data = await Menu.find();

        console.log("Retrieved menu items successfully:", data);
        res.status(200).json(data); // Respond with the retrieved menu items array
    } catch (error) { 
        console.error("Error retrieving menu items:", error.message);
        res.status(500).json({ error: 'Internal server error' }); // Handle errors gracefully
    }
});




// Start the server
const PORT =process.env.PORT|| 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
