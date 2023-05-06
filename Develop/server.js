const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

const noteDatabase = require ('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    console.log(`${req.method} is initiated`);
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    console.log(`${req.method} is initiated`);
});

app.get('/api/notes', (req, res) =>
  res.json(database)
);

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    updateDb();
    console.log(`a new note is added with ${new.Note} title`)
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);