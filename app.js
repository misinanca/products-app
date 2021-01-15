const express = require('express');
const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const db = mongoose.connect('mongodb://localhost/productAPI');

const app = express();

const port = process.env.PORT || 3000;
const Product = require('./models/product.model');
const productRouter = require('./routes/product.route')(Product);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', productRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my nodemon API');
});

app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`);
});
