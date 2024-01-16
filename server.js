const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connectDB = require('./utils/db');
const compression = require('compression');

const app = express();

// Connect to MongoDB
connectDB();

const allowedOrigins = [
    'https://manga-website1.netlify.app',
    'http://localhost:3000',
];

app.use(cors({
    origin: allowedOrigins,
}));

app.use(compression()); // Enable compression

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
