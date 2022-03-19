const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    sender:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type: Number,
        required: true
    },
    kind:{
        type: String,
        enum:['paid','borrowed'],
        required:true
    },
    createdOn:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', TransactionSchema);