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
 
quizCollections=['html','css','javascript','react','node','data','algorithms'];

function GetQuiz(quizCollection) {
  app.get(`/${quizCollection}`, (req, res) => {
    const db = getDb();

    db.collection(quizCollection).find({}).toArray()
        .then((books) =>{
          res.status(200).json(books);
      })
        .catch(() => {
          res.status(500).json({ error: 'Could not fetch!' });
      });
  });
}

quizCollections.forEach((collection) => {
  GetQuiz(collection);
});




