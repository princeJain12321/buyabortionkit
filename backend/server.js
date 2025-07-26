import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound} from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies
app.get('/', (req,res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();     // Get the current directory name
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the uploads directory

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => { console.log(console.log(`Server is running on port ${port}`))});





