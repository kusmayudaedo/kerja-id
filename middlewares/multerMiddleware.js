import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(process.cwd(), 'public', 'uploads'));
	},
	filename: (req, file, cb) => {
		const filename = file.originalname;
		cb(null, filename);
	},
});

const upload = multer({ storage });

export default upload;
