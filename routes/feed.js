const express = require('express')
const { body } = require('express-validator')
const isAuth = require('../middleware/is-auth')

const FeedConrtoller = require('../controllers/feed')

const router = express.Router()

router.get('/posts', isAuth , FeedConrtoller.getPosts)

router.post('/post' , isAuth, [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], FeedConrtoller.createPost)

router.get('/post/:postId', isAuth, FeedConrtoller.getPost)

router.put('/post/:postId', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], FeedConrtoller.updatePost)


router.delete('/post/:postId' , isAuth, FeedConrtoller.deletePost)

module.exports = router

