import multer from 'multer';
import path from 'path';
import DataParser from 'datauri/parser.js';
import { log } from 'console';

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, path.join(process.cwd(), 'public', 'uploads'));
// 	},
// 	filename: (req, file, cb) => {
// 		const filename = file.originalname;
// 		cb(null, filename);
// 	},
// });

const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
	const fileExtension = path.extname(file.originalname).toString();
	return parser.format(fileExtension, file.buffer).content;
};

export default upload;
