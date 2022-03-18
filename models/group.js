const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { cloudinary } = require("../cloudinary");

const GroupSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    users:[{
        user: {
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        netPay:{
            type: Number,
            required:true,
            default: 0
        }
    }],
    transactions:[{

    }],
    image:{
        url: String,
        filename: String
    }
})

GroupSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        if(doc.image.filename){
            await cloudinary.uploader.destroy(doc.image.filename);
        }
    }
})

module.exports = mongoose.model('Group', GroupSchema);