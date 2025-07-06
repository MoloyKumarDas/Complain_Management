const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

router.get('/new', (req, res) => {
  res.render('submitComplaint');
});

router.post('/new', async (req, res) => {
  const { receiverRole, message } = req.body;
  await Complaint.create({
    senderEmail: req.session.user.email,
    receiverRole,
    message
  });
  res.redirect('/dashboard');
});

router.get('/admin', async (req, res) => {
  const user = req.session.user;
  if (!['DSW', 'Faculty', 'Dept'].includes(user.role)) return res.redirect('/dashboard');
  const complaints = await Complaint.find({ receiverRole: user.role });
  res.render('viewComplaints', { complaints, user });
});

router.post('/respond/:id', async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  await Complaint.findByIdAndUpdate(id, {
    response: {
      message,
      responder: req.session.user.role,
      date: new Date()
    }
  });
  res.redirect('/complaints/admin');
});

router.get('/list', async (req, res) => {
  const complaints = await Complaint.find({ senderEmail: req.session.user.email });
  res.render('viewResponses', { complaints });
});

module.exports = router;