const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
  res.render('login');
});
// router.get('/', (req, res) => {
//   res.redirect('/login');
// });

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  let user = await User.findOne({ email, role });
  if (!user) {
    if (['Anonymous', 'Series', 'DeptUser'].includes(role)) {
      user = new User({ email, password, role });
      await user.save();
    } else {
      return res.send('Invalid admin credentials');
    }
  }
  req.session.user = user;
  res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
