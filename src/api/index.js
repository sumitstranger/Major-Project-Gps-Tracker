const express = require('express');

const messages = require('./messages');
const arduino = require('./arduino')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  }); 
});

router.use('/arduino',arduino)

router.use('/messages', messages);

module.exports = router;
