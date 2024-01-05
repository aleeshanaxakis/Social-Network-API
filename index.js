const express = requre('express');
const db = require('./confid/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Database Connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on ${PORT}`);
  });
});

db.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});

// Handle Unknown Routes
app.use((req, res) => {
  res.status(404).send('Route not found!');
});