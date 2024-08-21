const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
 
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));

app.post("/users", (req, res) => {
    const { name, surnames } = req.body

    if(!name || !surnames){
        res.status(400).json({ error: 'Name and surname are required.' });
    }

    const userRecord = `${surnames.toUpperCase()}, ${name.toUpperCase()}\n`;
    const filePath = path.join(__dirname, 'users.text');

    fs.appendFile(filePath, userRecord, (err) => {
        if (err) {
            return res.status(500).json({ error: 'The user could not be saved.' });
        }
        res.status(201).json({ message: 'User successfully created.' });
    })
})

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})