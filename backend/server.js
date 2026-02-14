const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require("morgan");


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/quizapp')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/users', require('./routes/users'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/scores', require('./routes/scores'));

app.listen(3000, () => console.log('Server running on port 3000'));
