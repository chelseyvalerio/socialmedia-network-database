const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/helpers");

const ReactionsSchema = new Schema (
    {
        reactionsId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId(),
        },
        reactionsBody: {
            type: String,
            required: true,
            maxlength: 10,
        },
        username: {
            type: String,
            required: true,
        },
        // creation: {
        //     type: Date,
        //     default: Date.now,
        //     get: (timestamp) => dateFormat(timestamp),
        // },

},
{
    toJSON: {
        getters: true,
    },
    id: false,
});

const ThoughtSchema = new Schema (
    {
        thoughtContent: {
            type: String,
            required: "thought is required",
            minlength: 5,
            maxlength: 350,
        },
        // creation: {
        //     type: Date,
        //     default: Date.now,
        //     get: (timestamp) => dateFormat(timestamp),
        // },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionsSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, 
        },
        id: false,
    }
);

ThoughtSchema.virtual("reactionTotal").get(function (){
    return this.reactions.length;
});

const Thought = model("Thoughts", ThoughtSchema);

module.exports = Thought;