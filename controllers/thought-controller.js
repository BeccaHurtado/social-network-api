const { Thought, User } = require('../models')

const thoughtController = {
    // get all thoughts
    getAllThought( req, res) {
        Thought.find({})
            .populate({
                path: 'reaction',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

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
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Nothing located' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reaction',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id' } )
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    // update a thought by id
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true} )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found here'})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },

    // add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.reactionId },
            { $push: { resction: { reaction: body } } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Not found :(' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    // remove a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: { reaction: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No reaction with this id '})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },

    // remove a thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found'})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController