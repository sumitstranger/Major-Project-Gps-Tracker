const express = require('express');

const router = express.Router();
const Joi = require('joi');

const db = require('../db');
const messages = db.get('arduino_location');

//messages.drop().then(console.log('done'));

const schema = Joi.object().keys({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

router.get('/get', (req, res) => {
  messages.find().then((allMessages) => {
    res.json(allMessages);
  });
});
router.get('/get-latest', (req, res) => {
  messages.findOne({}, { sort: { $natural: -1 } }).then((allMessages) => {
    res.json(allMessages);
  });
});

router.get('/', (req, res) => {
  console.log(req.query);
  //res.send('done')
  const result = Joi.validate(req.query, schema);

  if (result.error === null) {
    const { longitude, latitude } = req.query;
    const userMessage = {
      longitude,
      latitude,
      date: new Date(),
    };
    messages.insert(userMessage).then((insertedMessage) => {
      res.json(insertedMessage);
    });
  } else {
    next(result.error);
  }
});

module.exports = router;
