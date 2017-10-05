const express = require('express');
const schema = require('../db/schema.js');
const router = express.Router();
const mongoose = require('mongoose');
var User = schema.User;
var Lesson = schema.Lesson;
var Class = schema.Class;
var Application = schema.Application;

router.post('/applications', (req, res) => {
  console.log('application req.body', req.body)
  Application.create({
    class: req.body.class,
    teacher: req.body.teacher,
    student: req.body.student,
    reason: req.body.reason,
    status: req.body.status
  })
  .then( () => {
    res.send('class created')
  })
});

router.get('/applications', (req, res) => {
  Application.find({})
  .then( (result) => {
    res.send(result)
  })
});

router.put('/applications', (req, res) => {
  Application.findOne({
    student: req.body.student,
    class: req.body.class
  })
  .then( (result) => {
    result.status = req.body.status;
    console.log('application', result)
    result.save();
    res.send('Application has been approved by teacher!')
  })
})

module.exports = router;
