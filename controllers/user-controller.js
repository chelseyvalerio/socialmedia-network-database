const { User, Thought } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find({}).populate({path: "followers", select: "-_v"}).select("-_v").sort({ _id: -1})
        .then((userData) => res.json(userData))
        .catch((err)=> {console.log(err);
        res.sendStatus(400)
    });
    },

    getAllUserById({params}, res){
        User.findOne({_id: params.id}).populate({path:"thoughts",select:"-_v"}).populate({path: "followers", select: "-_v"}).select("-_v")
        .then((userData)=>{
            if (!userData){
                return res.status(404).json({ message: "user not found"});
            }
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    createUser({ body }, res) {
        User.create(body)
        .then((userData)=> res.json(userData))
        .catch((err) => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
        .then((userData)=>{
            if (!userData){
                res.status(404).json({ message: "user not found"});
                return;
            }
            res.json(userData);
        })
        .catch((err) => res.json(err));
        },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({ message: "user not found"});
            }
        })
        .then (() => {
            res.json({ message: "User deleted"});
        })
        .catch((err) => res.json(err));
    },

    addFollower({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { followers: params.followerId }},
            { new: true, runValidators: true }
        )
        .then((userData)=> {
            if (!userData){
                res.status(404).json({ message: "user not found"});
                return;
            }
            res.json(userData);
        })
        .catch((err)=> res.json(err));
    },

    removeFollower ({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { followers: params.followerId }},
            {new: true} // potentally delete this
        )
        .then((userData)=> {
            if (!userData){
                res.status(404).json({ message: "user not found"});
                return;
            }
            res.json(userData);
        })
        .catch((err)=> res.json(err)); 
    },
};

module.exports = userController;