const Group = require('../models/group')
const { cloudinary } = require("../cloudinary");

module.exports.allGroups = async (req,res)=>{
    const groups = await Group.find();
    res.render('groups/index',{groups});
}

module.exports.createNewGroup = async (req,res)=>{
    const group = new Group(req.body.group)
    group.owner = req.user;
    if(req.file)
        group.image = {url: req.file.path,filename:req.file.filename}
    else
        group.image = {url:"/images/group.jpg"}
    group.users.push({uid:req.user._id});
    await group.save();
    req.flash('success',"Created a new group")
    res.redirect("/groups")
}

module.exports.renderNewGroupForm = (req,res)=>{
    res.render('groups/new')
}

module.exports.showGroup = async(req,res)=>{
    const {id} = req.params;
    const group = await Group.findById(id).populate('users.uid');

    res.render('groups/show',{group})
}

module.exports.renderEditGroupForm = async(req,res)=>{
    const {id} = req.params;
    const group = await Group.findById(id);
    
    res.render('groups/edit',{group})
}

module.exports.editGroup = async(req,res)=>{
    const {id} = req.params;
    const group = await Group.findByIdAndUpdate(id,{...req.body.group});
    if(req.file){
        if(group.image.filename)
            await cloudinary.uploader.destroy(group.image.filename);
        group.image = {url: req.file.path,filename:req.file.filename}
    }
    await group.save();
    req.flash('success',"Updated group")
    res.redirect(`/groups/${id}`)
}

module.exports.deleteGroup = async(req,res)=>{
    const { id } = req.params
    await Group.findByIdAndDelete(id)
    req.flash('success',"Deleted group")
    res.redirect('/groups')
}

module.exports.joinGroup = async(req,res)=>{
    const {id} = req.params;
    const group = await Group.findById(id);

    group.users.push({uid:req.user._id});
    await group.save();
    req.flash('success',`You have joined the group ${group.name}`);
    res.redirect(`/groups/${group._id}`)
}
