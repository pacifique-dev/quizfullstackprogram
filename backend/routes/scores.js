const express = require('express');
const Score = require('../models/Score');
const router = express.Router();

router.post('/', async (req, res) => {
    const { user, score } = req.body;
    if (!user || score === undefined) return res.json({ error: 'User and score required' });

    const newScore = new Score({ user, score });
    await newScore.save();
    res.json({ message: 'Score saved' });
});

module.exports = router;
