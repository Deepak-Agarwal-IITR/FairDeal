const Group = require('../models/group');
const Transaction = require('../models/transaction');
var mongoose = require('mongoose');

module.exports.renderNewTransactionForm = async (req,res)=>{
    const {id} = req.params;
    const group = await Group.findById(id).populate('users.uid');

    res.render('transactions/new',{id, users: group.users})
}

module.exports.createTransaction = async (req,res)=>{
    const {id} = req.params;
    const group  = await Group.findById(id);

    var sender,receiver;
    if(req.body.transaction.kind === "paid"){
        sender = req.user._id;
        receiver = mongoose.Types.ObjectId(req.body.user);
    }else{
        receiver = req.user;
        sender = mongoose.Types.ObjectId(req.body.user);
    }
    const transaction = new Transaction({...req.body.transaction,sender,receiver});
    const s = group.users.find(user=> user.uid.toString() === sender.toString())
    const r = group.users.find(user=> user.uid.toString() === receiver.toString() );
    s.netPay = s.netPay + req.body.transaction.amount;
    r.netPay = r.netPay - req.body.transaction.amount;
    await group.save();
    res.redirect(`/groups/${group._id}`)
}