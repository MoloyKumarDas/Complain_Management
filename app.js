const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const app = express();
require('dotenv').config();
console.log("Auth, dashboard, and complaint routes loaded.");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const complaintRoutes = require('./routes/complaint');

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/complaints', complaintRoutes);
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));