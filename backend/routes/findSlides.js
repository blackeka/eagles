const express = require('express');
const nodemailer = require('nodemailer');
const schema = require('../db/schema.js');
const router = express.Router();
const mongoose = require('mongoose');
var User = schema.User;
var Lesson = schema.Lesson;
var Slide = schema.Slide;

router.post('/findSlides', (req, res) => {
  Slide.find({
    lessonRef: req.body.lessonRef
  })
  .then( (result) => {
    console.log('slides found', result);
    res.send(result)
  })
});

module.exports = router;
