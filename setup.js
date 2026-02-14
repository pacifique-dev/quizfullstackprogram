const mongoose = require('mongoose');
const Question = require('./models/Question');

mongoose.connect('mongodb://127.0.0.1:27017/quiz_app')
    .then(() => {
        console.log('MongoDB connected for setup');

        const questions = [
            {
                question: 'You buy 3 notebooks for $2 each and a pen for $1. How much did you spend in total?',
                options: ['$5', '$6', '$7', '$8'],
                answer: '$7'
            },
            {
                question: 'If a car travels 60 km in 1 hour, how far will it travel in 2.5 hours at the same speed?',
                options: ['120 km', '150 km', '100 km', '130 km'],
                answer: '150 km'
            },
            {
                question: 'A water tank holds 500 liters. If it is filled at 50 liters per hour, how long to fill completely?',
                options: ['8 hours', '10 hours', '12 hours', '15 hours'],
                answer: '10 hours'
            },
            {
                question: 'You save $50 every month. How much will you have after 1 year?',
                options: ['$500', '$550', '$600', '$650'],
                answer: '$600'
            },
            {
                question: 'If a train leaves at 9:00 AM and arrives at 1:00 PM, how long is the journey?',
                options: ['3 hours', '4 hours', '5 hours', '6 hours'],
                answer: '4 hours'
            }
        ];

        return Question.insertMany(questions);
    })
    .then(() => {
        console.log('5 real-life questions added');
        mongoose.disconnect();
    })
    .catch(err => console.error('Setup error:', err));
