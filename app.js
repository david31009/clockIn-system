// Express Initialization
const express = require('express');
require('dotenv').config();

const app = express();
const { PORT, API_VERSION } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(`/api/${API_VERSION}`, [
  require('./routes/clock_route'),
  require('./routes/attendance_route'),
  require('./routes/employee_route')
]);

// Error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

// set port to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
