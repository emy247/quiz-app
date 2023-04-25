const express = require('express');
const cors = require('cors');
const app = express();
const { connectToDb, getDb } = require('./db');


connectToDb((err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    app.listen(5000, () => {
      console.log('App listening on port 5000');
    });
  }
});

app.use(cors());

app.get('/html', (req, res) => {
  const db = getDb();

  db.collection('html').find({}).toArray()
    .then((books) => {
      res.status(200).json(books);
      date = books;
    })
    .catch(() => {
      res.status(500).json({ error: 'could not fetch' });
    });
});

app.get('/css', (req, res) => {
  const db = getDb();

  db.collection('css').find({}).toArray()
    .then((books) => {
      res.status(200).json(books);
      date = books;
    })
    .catch(() => {
      res.status(500).json({ error: 'could not fetch' });
    });
});

app.get('/javascript', (req, res) => {
  const db = getDb();

  db.collection('javascript').find({}).toArray()
    .then((books) => {
      res.status(200).json(books);
      date = books;
    })
    .catch(() => {
      res.status(500).json({ error: 'could not fetch' });
    });
});




