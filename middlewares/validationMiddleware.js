import { body, param, validationResult } from 'express-validator';
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/jobModel.js';
import User from '../models/userModel.js';

const withValidationErrors = (validateValue) => {
	return [
		validateValue,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((error) => error.msg);
				if (errorMessages[0].startsWith('Job not found')) {
					throw new NotFoundError(errorMessages);
				}
				if (errorMessages[0].startsWith('Unauthorize')) {
					throw new UnauthorizedError('Unauthorize');
				}
				throw new BadRequestError(errorMessages);
			}
			next();
		},
	];
};

export const validateJobInput = withValidationErrors([
	body('company').notEmpty().withMessage('Company is required'),
	body('position').notEmpty().withMessage('Position is required'),
	body('jobLocation').notEmpty().withMessage('Job location is required'),
	body('jobStatus')
		.isIn(Object.values(JOB_STATUS))
		.withMessage('Invalid status value'),
	body('jobType')
		.isIn(Object.values(JOB_TYPE))
		.withMessage('Invalid type value'),
]);

export const validateIdParam = withValidationErrors([
	param('id').custom(async (value, { req }) => {
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError('Invalid ID');

		const job = await Job.findById(value);
		if (!job) {
			throw new NotFoundError('Job not found');
		}

		const isAdmin = req.user.role === 'admin';
		const isOwner = req.user.userId === job.createdBy.toString();

		if (!isAdmin && !isOwner) {
			throw new UnauthorizedError('Unauthorize');
		}
	}),
]);

export const validateRegisterInput = withValidationErrors([
	body('firstName').notEmpty().withMessage('First Name is required'),
	body('lastName').notEmpty().withMessage('Last Name is required'),
	body('username')
		.notEmpty()
		.withMessage('Username is required')
		.custom(async (username) => {
			const user = await User.findOne({ username });
			if (user) {
				throw new BadRequestError('Username already exist');
			}
		}),
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email')
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) {
				throw new BadRequestError('Email already exist');
			}
		}),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 8 })
		.withMessage('Password must be at leased 8 characters'),
	body('confirmPassword')
		.notEmpty()
		.withMessage('Confirm password is required')
		.custom(async (confirmPassword, { req }) => {
			const { password } = req.body;
			if (password !== confirmPassword) {
				throw new BadRequestError('Password must match');
			}
		}),
]);

export const validateLoginInput = withValidationErrors([
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email'),
	body('password').notEmpty().withMessage('Password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
	body('username')
		.notEmpty()
		.withMessage('Username is required')
		.custom(async (username, { req }) => {
			const user = await User.findOne({ username });
			if (user && user._id.toString() !== req.user.userId) {
				const checkUsername = await User.findOne({
					username: req.body.username,
				});
				if (checkUsername) {
					throw new BadRequestError('Username already exist');
				}
			}
		}),
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email')
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email });
			if (user && user._id.toString() !== req.user.userId) {
				throw new BadRequestError('Email already exist');
			}
		}),
]);
