const { Schema, model, Types } = require("mongoose");
const dateFormater = require("../utils/helpers");

const EmojiSchema = new Schema (
    {
        emojiId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId(),
        },
        emojiBody: {
            type: String,
            required: true,
            maxlength: 10,
        },
        username: {
            type: String,
            required: true,
        },
        creation: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormater(timestamp),
        },

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
            required: true,
            minlength: 5,
            maxlength: 350,
        },
        creation: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormater(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        emojis: [EmojiSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, 
        },
        id: false,
    }
);

ThoughtSchema.virtual("thoughtTotal").get(function (){
    return this.emojis.length;
});

const Thoughts = model("Thought", ThoughtSchema);

module.exports = Thoughts;