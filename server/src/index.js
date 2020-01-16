const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://rbq:rbqadmin@cluster0-xjts3.mongodb.net/wazedev?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);