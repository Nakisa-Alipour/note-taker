const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static assets
app.use(express.static('public'));

// Route for getting all notes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// Route for creating a new note
app.post('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = Date.now().toString();
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// Route for updating a note by ID
app.put('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const updatedNote = req.body;
    updatedNote.id = noteId;
    const noteIndex = notes.findIndex(note => note.id === noteId);
    if (noteIndex === -1) {
      res.sendStatus(404);
    } else {
      notes[noteIndex] = updatedNote;
      fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(updatedNote);
      });
    }
  });
});

// Route for deleting a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const noteIndex = notes.findIndex(note => note.id === noteId);
    if (noteIndex === -1) {
      res.sendStatus(404);
    } else {
      notes.splice(noteIndex, 1);
      fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.sendStatus(204);
      });
    }
  });
});

// Route for serving the HTML file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Catch-all route for serving the index HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
