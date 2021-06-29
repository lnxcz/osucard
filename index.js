const express = require('express');
const path = require('path');
const app = express();

require("dotenv").config();

app.use(express.static(__dirname + '/public'));

app.use('/card', require('./routes/card.js'));
app.use('/', require('./routes/index.js'));
app.use('/profile', require('./routes/profile.js'));

app.listen(process.env.PORT, () => {
  console.log("App listening on *" + process.env.PORT);
});