const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport')

const users = require('../controllers/users')

const multer = require('multer');
const { userImageStorage } = require('../cloudinary');
const upload = multer({ storage:userImageStorage });

router.route('/register')
    .get(users.renderRegister)
    .post(upload.single('image'),catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),users.login)

router.get('/logout',users.logout)

module.exports = router;