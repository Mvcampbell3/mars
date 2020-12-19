const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes)

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to mongo')
  }
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})