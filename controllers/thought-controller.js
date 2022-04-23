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
        
    }
}