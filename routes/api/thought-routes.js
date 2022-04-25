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
    .post(addReaction)
    .post(addThought)

router
    .route('/:id')
    .delete(deleteReaction)
    .delete(deleteThought)
    .get(getThoughtById)
    .put(updateThoughtById)

module.exports = router