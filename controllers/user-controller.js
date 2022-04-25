const { User } = require('../models')

const userController = {
    // create a new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    
    // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User unidentified :(' })
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    // create a user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    // update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not indentified :(' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },

    // delete a user 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user indentified :(' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    }
}

module.exports = userController