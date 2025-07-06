const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  senderEmail: String,
  receiverRole: String,
  message: String,
  date: { type: Date, default: Date.now },
  response: {
    message: String,
    responder: String,
    date: Date
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);