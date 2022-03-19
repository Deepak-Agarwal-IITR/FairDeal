const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const groupImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'FairDeal/Group',
        allowed_formats:["jpeg","png","jpg","webp"]
    }
})
const userImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'FairDeal/User',
        allowed_formats:["jpeg","png","jpg","webp"]
    }
})

module.exports = {
    cloudinary,
    userImageStorage,
    groupImageStorage
}
