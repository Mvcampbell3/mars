const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes)

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})