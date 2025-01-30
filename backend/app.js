// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routers/userRoutes");
const passport = require("passport");
const cors = require("cors");
const cookieSession = require('cookie-session');
const projectRoutes = require('./routers/projectRoutes');
require('./config/passport');
const authRoutes = require('./routers/auth');
const session = require('express-session');
require('dotenv').config(); 
const chatRoutes = require('./routers/chatRoutes')
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRETKEY || "JAILOHIT",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time
      secure: false, // set to true if using https
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
  })
)

app.use("/auth",authRoutes);



app.use((req, res, next) => {
  console.log("startttt",req.user,req.session);
  next();
});

// API Routes
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/chat',chatRoutes)
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Server Port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
