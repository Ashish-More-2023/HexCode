
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
const User = require('./models/userModel');
const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SECRETKEY,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin:process.env.CLIENT_URL || "http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
  })
)

app.use("/auth",authRoutes);



app.use((req, res, next) => {
  next();
});

app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/chat',chatRoutes);

app.get('/search',async (req,res)=>{
    try {
        const users = await User.find({}, "_id name email");
        console.log("Users found:", users);
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users", details: error.message });
    }
})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
