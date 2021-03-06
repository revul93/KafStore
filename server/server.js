// modules
const express = require('express');
const connectToDb = require('../config/db');
// const destroy = require('./actions/destroy');

// routes
const userRouter = require('./routes/api/user');
const reviewRouter = require('./routes/api/review');
const complaintRouter = require('./routes/api/complaint');
const bookRouter = require('./routes/api/book');
const utilsRouter = require('./routes/api/utils');
const staticRouter = require('./routes/api/static');
const orderRouter = require('./routes/api/order');
// create new express app
const app = express();

// use middlewares
app.use(express.json({ extended: false }));

// set routes
app.use('/api/user', userRouter);
app.use('/api/review', reviewRouter);
app.use('/api/complaint', complaintRouter);
app.use('/api/book', bookRouter);
app.use('/api/utils', utilsRouter);
app.use('/api/static', staticRouter);
app.use('/api/order', orderRouter);

// default route, remove when used in production
app.get('/', (req, res) => {
  return res.send('Welcome to KafStore');
});

// Initate database connection
connectToDb();

// destroy();

// set configuration
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
