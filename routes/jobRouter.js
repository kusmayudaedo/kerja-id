import { Router } from 'express';
import {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
	showStats,
} from '../controllers/jobController.js';

import {
	validateJobInput,
	validateIdParam,
} from '../middlewares/validationMiddleware.js';

import { checkForTestUser } from '../middlewares/authMiddleware.js';

const router = Router();

router
	.route('/')
	.get(getAllJobs)
	.post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);

router
	.route('/:id')
	.get(validateIdParam, getJob)
	.patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
	.delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
