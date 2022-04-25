const { Schema, model } = require('mongoose')

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // matching validation goes here
        //
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend ) => total + friend.replies.length + 1, 0)
})

// create the User model
const User = model('User', UserSchema)

module.exports = User