const mongoose = require('mongoose');
const User = require('../models/user')
const Group = require('../models/group')
const Transaction = require('../models/transaction')

mongoose.connect('mongodb://localhost:27017/payments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
})


const seedDB = async () => {
    
    await User.deleteMany({});
    console.log("Deleted users")
    await Group.deleteMany({});
    console.log("Deleted groups")
    await Transaction.deleteMany({})
    console.log("Deleted transactions")

    const user1 = new User({ username:"a",name:"A",image:{url:"/images/user.jpg"} });
    const registeredUser1 = await User.register(user1, "a");
    const user2 = new User({ username:"b",name:"B",image:{url:"/images/user.jpg"} });
    const registeredUser2 = await User.register(user2, "b");
    const user3 = new User({ username:"c",name:"C",image:{url:"/images/user.jpg"} });
    const registeredUser3 = await User.register(user3, "c");
}

seedDB().then(()=>{
    mongoose.connection.close();
});