// Core Modules
const express = require("express");
const bodyParser = require("body-parser");

// Third-party Modules
// const cookieSession = require("cookie-session");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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

app.set('trust proxy', true);

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

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up session middleware
app.use(session({
  secret: "the_one_piece_is_real",
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URI,
  }),
}));


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
