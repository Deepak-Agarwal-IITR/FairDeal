const User = require('../models/user');
const Group = require('../models/group')
const Transaction = require('../models/transaction')
module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async(req,res)=>{
    try{
        const {name,username,password} = req.body;
        const user = new User({name,username});
        
        const registeredUser = await User.register(user, password)
        if(req.file)
            registeredUser.image = {url: req.file.path,filename:req.file.filename}
        else
            registeredUser.image = {url:"/images/user.jpg"}
        await registeredUser.save();
        
        req.login(registeredUser,err=>{
            if (err) return next(err);
            req.flash('success', 'Welcome to FairDeal')
            res.redirect('/groups')
        })
        
    }catch(e){
        req.flash('error',e.message)
        res.redirect('register')
    }
    
}

module.exports.renderLogin = (req,res)=>{
    res.render('users/login')
}
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back');
    const redirectUrl = req.session.returnTo || '/groups'
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}
module.exports.logout = (req,res)=>{
    req.logout();
    req.flash('success',"Goodbye!")
    res.redirect('/');
}

module.exports.profilePage = async (req,res)=>{
    const groups = await Group.find({'users.uid':req.user._id});
    const transactions = await Transaction.find({$or: [{"sender": req.user._id},{"receiver": req.user._id}]}).populate("sender").populate("receiver")
    res.render("users/profile",{groups,transactions});
}

module.exports.dashboard = async (req,res)=>{
    const groups = await Group.find({'users.uid':req.user._id});
    const transactions = await Transaction.find({$or: [{"sender": req.user._id},{"receiver": req.user._id}]}).populate("sender").populate("receiver")
    res.render("users/dashboard",{groups,transactions});
}

module.exports.renderEditProfileForm = (req,res)=>{
    res.render("users/edit")
}

module.exports.editProfile = async(req,res)=>{
    const {name} = req.body.user;    
    const user = await User.findByIdAndUpdate(req.user._id,{name});
    if(req.file){
        if(user.image.filename)
            await cloudinary.uploader.destroy(user.image.filename);
        user.image = {url: req.file.path,filename:req.file.filename}
    }
    await user.save();
    req.flash('success',"Updated Profile")
    res.redirect("/profile")
}