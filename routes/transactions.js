const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');

const transactions = require('../controllers/transactions')
const {isLoggedIn,isJoinedInGroup} = require('../middleware')

router.route('/')
    .get(isLoggedIn,isJoinedInGroup,catchAsync(transactions.renderNewTransactionForm))
    .post(isLoggedIn,isJoinedInGroup,catchAsync(transactions.createTransaction))

module.exports = router;