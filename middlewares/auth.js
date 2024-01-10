const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        // Return error response if token is missing
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        // Return error response if token is invalid
        return res.status(401).json({ message: 'Authentication token invalid' });
    }
};

module.exports = authMiddleware;
