const { Schema, model, Types } = require('mongoose')

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        // must be 1-280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => defaultFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
)

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true
            // 280 character max
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought