
const express = require('express');
const { handleError, ErrorHandler } = require('./helpers/error');

const app = express();
app.use(express.json());

const port = 3000;

const postRoutes = require('./routes/post');

app.use('/posts', postRoutes);

// API error#404 handler
app.use(function () {
  throw new ErrorHandler();
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => console.log(`TSH app listening on port ${port}! api@ http://localhost:3000/`));

module.exports = app;