const { Thought, User } = require('../models')

const thoughtController = {
    // add a thought
    addThought({ params, body }, res) {
        console.log(body)
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Nothing located' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    // add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.reactionId },
            { $push: { reaction: body } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Not found :(' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },

    // remove a reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: { reaction: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },

    // remove a thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought found'})
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thought: params.thoughtId }},
                { new: true }
            )
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought found'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController