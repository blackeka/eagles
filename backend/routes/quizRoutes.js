const express = require('express');
const schema = require('../db/schema.js');
const router = express.Router();
const mongoose = require('mongoose');
const Quiz = schema.Quiz;

router.post('/quiz', (req, res) => {
  let quizCode = req.body.quizCode;
  let questions = req.body.questions;
  let answers = req.body.answers;
  let relatedSlides = req.body.relateSlides;
  let lessonRef = req.body.lessonRef;
  console.log(req.body, ' or ', req.query, 'or', req.params)
  console.log(`quizCode: ${quizCode}, questions: ${questions} answers: ${answers} 
  relatedslides: ${relatedSlides} lessonRef: ${lessonRef} `)
  console.log('quiz post called')
  Quiz.create({
    quizCode,
    questions,
    answers,
    relatedSlides,
    lessonRef
  })
  .then((quiz) => {
    res.status(201).send(`Quiz successfully saved to database ${quiz}`);
  })
  .catch((err) => {
    res.status(404).send(`Something went wrong ${err}`);
  })
})

module.exports = router;