const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const groups = require('../controllers/groups')
const {isLoggedIn,isOwner} = require('../middleware')

const multer = require('multer');
const { groupImageStorage } = require('../cloudinary');
const upload = multer({ storage:groupImageStorage });

router.route('/')
    .get(catchAsync(groups.allGroups))
    .post(isLoggedIn,upload.single('image'),catchAsync(groups.createNewGroup))

router.route('/new')
    .get(isLoggedIn,groups.renderNewGroupForm)

router.route('/:id')
    .get(catchAsync(groups.showGroup))
    .put(isLoggedIn,isOwner,upload.single('image'),catchAsync(groups.editGroup))
    .delete(isLoggedIn,isOwner,catchAsync(groups.deleteGroup))

router.route('/:id/edit')
    .get(isLoggedIn,isOwner,catchAsync(groups.renderEditGroupForm))


module.exports = router;