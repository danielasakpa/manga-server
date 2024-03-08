// Core Modules
const express = require("express");
const bodyParser = require("body-parser");

// Third-party Modules
const cookieSession = require("cookie-session");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
// const session = require('express-session');
const compression = require('compression');
const passport = require("passport");

// Environment Configuration
require('dotenv').config();

// Custom Modules
const connectDB = require('./utils/db');
require("./utils/passport");

// Swagger Documentation
const swaggerDocument = require('./swagger.json');

const app = express();

// Connect to MongoDB
connectDB();

app.set('trust proxy', 1)

const allowedOrigins = ['https://manga-website1.netlify.app', 'https://manga-website-odjt.onrender.com', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    secure: true,
    sameSite: "none",
    httpOnly: true,
    name: "session",
    keys: [`${process.env.SESSION_SECRET}`],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());


var options = {
  explorer: true
};

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

// Routes
const authRouter = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const readingListRoutes = require("./routes/readingListRoutes");
const commentRoutes = require("./routes/commentRoutes");
app.use('/api/auth', authRouter);
app.use("/api/user", userRoutes);
app.use("/api/readingList", readingListRoutes);
app.use("/api/comment", commentRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
