/**
 * Modules
 */
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

/**
 * Express app
 */
const app = express();
const PORT = 3000;

/**
 * Middlewares
 */
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));


/**
 * Endpoints
 */

/**
 * POST /users
 * 
 * Adds a new user to the system by appending the user's name and surnames to the users.txt file.
 * 
 * @route POST /users
 * @param {string} req.body.name - The name of the user to be added.
 * @param {string} req.body.surnames - The surnames of the user to be added.
 * @returns {object} JSON response indicating success or failure of user creation.
 */

app.post("/users", (req, res) => {
    const { name, surnames } = req.body

    if(!name || !surnames){
        return res.status(400).json({ error: 'Name and surname are required.' });
    }

    const userRecord = `${surnames.toUpperCase()}, ${name.toUpperCase()}\n`;
    const filePath = path.join(__dirname, './data/users.txt');

    fs.appendFile(filePath, userRecord, (err) => {
        if (err) {
            return res.status(500).json({ error: 'The user could not be saved.' });
        }
        res.status(201).json({ message: 'User successfully created.' });
    })
})

/**
 * GET /users
 * 
 * Retrieves a list of users from the users.txt file. Users can be filtered by name or surnames.
 * If no filters are provided, all users will be returned.
 * 
 * @route GET /users
 * @param {string} [req.query.name] - Optional query parameter to filter users by name.
 * @param {string} [req.query.surnames] - Optional query parameter to filter users by surnames.
 * @returns {array} JSON response containing the list of users or filtered users.
 */

app.get('/users', (req, res) => {
    const { name, surnames } = req.query;
    const filePath = path.join(__dirname, './data/users.txt');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'The user file could not be read.' });
        }

        const users = data.split('\n').filter(line => line.trim() !== '');

        if (!name && !surnames) {
            return res.json(users);
        }

        const nameQuery = name ? name.toLowerCase() : '';
        const surnamesQuery = surnames ? surnames.toLowerCase() : '';

        const filteredUsers = users.filter(user => {
            const parts = user.split(', ');
            if (parts.length !== 2) return false;
                const [userSurnames, userName] = parts;
                const matchesName = nameQuery ? userName.toLowerCase().includes(nameQuery) : true;
            const matchesSurnames = surnamesQuery ? userSurnames.toLowerCase().includes(surnamesQuery) : true;
                return matchesName && matchesSurnames;
        });

        res.json(filteredUsers)

    })

})

/**
 * Starts the server and listens on the specified port.
 * Logs an error message if the server fails to start.
 */

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})