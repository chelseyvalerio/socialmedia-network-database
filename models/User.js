const { Schema, model } = require("mongoose");

const UserSchema = new Schema (
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
            type: Schema.Types.ObjectId,
            ref: "Thoughts",
    }],
        followers: [{
            type: Schema.Types.ObjectId,
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

UserSchema.virtual("followerTotal").get(function(){
    return this.followers.length;
});

const User = model("User", UserSchema);

module.exports = User;

