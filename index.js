const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/public'));

app.use('/card', require('./routes/card.js'))
app.use('/', require('./routes/index.js'))

app.listen(process.env.PORT, () => {
  console.log("App listening on *" + process.env.PORT);
})

//damn