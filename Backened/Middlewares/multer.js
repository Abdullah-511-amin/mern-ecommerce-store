const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(process.cwd(), 'uploads');

// ensure folder exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + file.originalname;
        cb(null, unique);
    }
});

const fileFilter = (req, file, cb) => {
    const allowTypes = ['image/png', 'image/jpeg', 'image/webp'];

    if (allowTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;