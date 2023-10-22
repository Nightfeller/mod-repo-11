const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const notesData = require('./public/db/db.json');

const PORT = process.env.POST || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notesData));

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.info(`${req.method} request recived to get reviews.`);
});

app.post('api/notes', (req, res) => {
    console.into(`${req.method} request recived to add a review.`);

    const {title, review} = req.body;

    if (title && review) {
        const newNote = {
            title,
            review
        };

        notes.push(newNote);
        const reviewString = JSON.stringify(notes, null);
        fs.writeFile(`./public/db/db.json`, reviewString).then((err) => {
            err ? console.error(err) : console.log(`Successfully updated reviews.`);
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in creating note.');
    }
});

app.listen(PORT, () => console.log(`App listening on localhost:${PORT}`));