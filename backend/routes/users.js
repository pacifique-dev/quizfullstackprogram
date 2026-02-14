const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, level, password } = req.body;
    if (!username || !email || !level || !password) return res.json({ error: 'All fields required' });

    const existing = await User.findOne({ email });
    if (existing) return res.json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, level, password: hashed });
    await user.save();
    res.json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: 'Incorrect password' });

    res.json({ userId: user._id });
});

module.exports = router;
