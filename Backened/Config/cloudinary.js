const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const UploadonCloudinary = async (filepath) => {
    try {

        const upload = await cloudinary.uploader.upload(filepath);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        return upload.secure_url;

    } catch (error) {

        console.log(error);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        return null;
    }
};

module.exports = UploadonCloudinary;