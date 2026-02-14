const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
    const questions = await Question.find();
    res.json(questions);
});

router.post('/',async(req,res)=>{
  const questions = req.body;
  await Question.insertMany(questions);
  res.json({
    message:"questions added successfully"
  });
})

module.exports = router;
