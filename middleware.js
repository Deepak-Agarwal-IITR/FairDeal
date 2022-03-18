const Group = require('./models/group')
const catchAsync = require("./utils/catchAsync");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You musted be signed in')
        return res.redirect('/login')
    }
    next();
}

module.exports.isOwner = catchAsync(async(req,res,next) => {
    const {id} = req.params;
    const group = await Group.findById(id);
    if(!group.owner.equals(req.user._id)){
        req.flash('error',"You don't have permissions")
        return res.redirect(`/groups/${id}`);
    }
    next();
})

// module.exports.isCommentUser = catchAsync(async(req,res,next) => {
//     const { id,lectureId,commentId } = req.params;
//     const comment = await Comment.findById(commentId);
//     if(!comment.user.equals(req.user._id)){
//         req.flash('error', "You don't have permissions")
//         return res.redirect(`/groups/${id}/lectures/${lectureId}`);
//     }
//     next();
// })

module.exports.isEnrolledInGroup = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const group = await Group.findById(id);
    if(!(group.users.includes(req.user._id) || group.owner.equals(req.user._id))){
        req.flash('error', "You are not a member of the group.")
        return res.redirect(`/groups/${id}`);
    }
    next();
})

module.exports.isAlreadyEnrolled = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const group = await Group.findById(id);
    if ((group.users.includes(req.user._id) || group.owner.equals(req.user._id))) {
        req.flash('error', "You are already in the group.")
        return res.redirect(`/groups/${id}`);
    }
    next();
})