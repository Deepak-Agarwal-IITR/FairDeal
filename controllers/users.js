const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async(req,res)=>{
    //res.send(req.body)
    try{
        const {name,username,password} = req.body;
        const user = new User({name,username});
        const registeredUser = await User.register(user, password)
        //console.log(registeredUser)
        req.login(registeredUser,err=>{
            if (err) return next(err);
            req.flash('success', 'Welcome to Template')
            res.redirect('/main')
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
    const redirectUrl = req.session.returnTo || '/main'
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}
module.exports.logout = (req,res)=>{
    req.logout();
    req.flash('success',"Goodbye!")
    res.redirect('/');
}