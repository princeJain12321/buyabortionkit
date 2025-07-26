import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import cookieParser from 'cookie-parser';

const protect = asyncHandler(async (req, res, next) => { 
    let token;

    console.log('Request cookies:', req.cookies); // Log the cookies for debugging

    token = req.cookies.token;
    // Check for token in cookies
    if (token) {

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password'); // Exclude password from user object
            next();

        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});  

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export { protect, admin };
