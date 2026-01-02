const {validationResult} = require('express-validator')


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
         return res.status(422).json({message: 'Validation failed' , errors: errors.array()}) 
    }
    const title = req.body.title
    const content = req.body.content
    res.status(201).json({
        message: 'Post created successfully!',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: { name: 'mohamad' },
            createdAt: new Date()
        }
    })
}