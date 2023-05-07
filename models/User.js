const { DB, model } = require("mongoose");

const UserDB = new DB (
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/],
        },
        thoughts: [{
            type: DB.Types.ObjectId,
            ref: "Thought",
    }],
        followers: [{
            type: DB.Types.ObjectId,
            ref: "User",
    }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

UserDB.virtual("followerTotal").get(function(){
    return this.followers.length;
});

const User = model("User", UserDB);

module.exports = User;

