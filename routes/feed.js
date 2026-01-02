const express = require('express')
const { body } = require('express-validator')

const FeedConrtoller = require('../controllers/feed')

const router = express.Router()

router.get('/posts', FeedConrtoller.getPosts)

router.post('/post', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], FeedConrtoller.createPost)

module.exports = router