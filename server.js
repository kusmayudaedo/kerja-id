import 'express-async-errors';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import mongSanitize from 'express-mongo-sanitize';

// routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRoute from './routes/userRoute.js';

// middleware
import errorHandlerMiddlewares from './middlewares/errorHandlerMiddleware.js';
import { authenticateUser } from './middlewares/authMiddleware.js';

// uploads
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(express.json());
app.use(helmet());
app.use(mongSanitize());
app.use(cookieParser());

//Use router
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRoute);
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
	res.status(404).json({ message: 'not found' });
});

app.use('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use(errorHandlerMiddlewares);

const port = process.env.PORT || 5100;

try {
	await mongoose.connect(process.env.MONGO_URL);
	app.listen(port, () => {
		console.log(`server running on PORT ${port}`);
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}
