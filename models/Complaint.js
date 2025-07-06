const mongoose = require('mongoose');

// const complaintSchema = new mongoose.Schema({
//   senderEmail: String,
//   receiverRole: String,
//   message: String,
//   date: { type: Date, default: Date.now },
//   response: {
//     message: String,
//     responder: String,
//     date: Date
//   }
// });
const complaintSchema = new mongoose.Schema({
  senderEmail: String,
  receiverRole: String,
  message: String,
  date: { type: Date, default: Date.now },
  response: {
    message: { type: String },
    responder: { type: String },
    date: { type: Date }
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);