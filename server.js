const express = require('express');
const userRouter = require('./routes/api/user');
const reviewRouter = require('./routes/api/review');
const connectToDb = require('./config/db');

// create new express app
const app = express();

// use middlewares
app.use(express.json({ extended: false }));

// set routes
app.use('/api/user', userRouter);
app.use('/api/review', reviewRouter);

// default route, remove when used in production
app.get('/', (req, res) => {
  return res.send('Welcome to KafStore');
});

// Initate database connection
connectToDb();

// set configuration
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
