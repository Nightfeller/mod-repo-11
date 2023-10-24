const express = require('express');
const path = require('path');
const uuid = require('generate-unique-id');
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

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request recived to add a review.`);

    const {title, text} = req.body;
    console.log(title);
    console.log(text);
    if (title && text) {
        const newNote = {
            id: uuid(),
            title,
            text
        };

        const notes = notesData;

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


// app.delete('/api/notes/:id', (req, res) => {
//     console.info(`${req.method} request recived to delete a review.`);

//     const noteFolder = notesData;

//     const queueForDeletion = noteFolder.filter((element) => {
//         if (element.id != req.params.id) {
//             console.log(element);
//             return element;
//         }
//     });

//     const deletionString = JSON.stringify(queueForDeletion, null);
//     fs.writeFile(`./public/db/db.json`, deletionString).then((err) => {
//         err ? console.error(err) : console.log(`Successfully updated reviews.`);
//     });

//     if(deletionString === null) {
//         console.log(true);
//     } else if (deletionString == "undefined") {
//         console.log("not defined");
//     } else {
//         console.log(false);
//         console.log(deletionString);
//     }
// });

app.listen(PORT, () => console.log(`App listening on localhost:${PORT}`));