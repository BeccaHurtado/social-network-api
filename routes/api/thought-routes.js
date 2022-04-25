const router = require('express').Router()

const {
    getAllThought,
    addThought,
    getThoughtById,
    updateThoughtById,
    addReaction,
    deleteReaction,
    deleteThought
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThought)
    .post(addThought)

router
    .route('/:id')
    .delete(deleteThought)
    .get(getThoughtById)
    .put(updateThoughtById)

router
    .route('/:id/reaction')
    .post(addReaction)

router
    .route('/:id/reaction/:reactionId')
    .delete(deleteReaction)

module.exports = router