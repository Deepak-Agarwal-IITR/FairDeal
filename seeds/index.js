const mongoose = require('mongoose');
const User = require('../models/user')

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

    const user1 = new User({ username:"a",name:"A" });
    const registeredUser1 = await User.register(user1, "a");
    const user2 = new User({ username:"b",name:"B" });
    const registeredUser2 = await User.register(user2, "b");
    const user3 = new User({ username:"c",name:"C" });
    const registeredUser3 = await User.register(user3, "c");
}

seedDB().then(()=>{
    mongoose.connection.close();
});