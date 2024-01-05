const { connect } = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/studentsDB';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

const db = connect(uri, options);

module.exports = db;