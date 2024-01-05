const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/studentsDB';

// Connect to the database and get the connection object
const db = connect(connectionString);

// Export the connection object
module.exports = db;