const { validationResult } = require('express-validator')
const Post = require('../models/post')


exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            title: 'firstPost',
            content: 'this is first Post',
            imageUrl: 'images/mm.png',
            creator: { name: 'mohamad' },
            createdAt: new Date()
        }]
    })
}


exports.createPost = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { 
        const error = new Error('Validation failed')
        error.statusCode = 422 
        throw error
    }
    const title = req.body.title
    const content = req.body.content
    const post = new Post({
        title: title,
        imageUrl: 'images/mm.png',
        content: content,
        creator: { name: 'mohamad' },
    })
    post.save().then(result => {
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}