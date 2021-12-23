const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')
const User = require('../models/user')


//Deletes an entry based on the id
blogsRouter.delete('/:id', async (request, response) => {

    const id = request.params.id

    const decodedToken = request.user

    const blog = await Blog.findById(id)
    const user = blog.users[0]

    if (user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'unauthorized access' }).end()
    }
})

//Add new entries
blogsRouter.put('/:id', async (request, response) => {

    const body = request.body

    const entry = {
        title: body.title,
        author: body.autor,
        url: body.url,
        likes: body.likes,
        id: request.params.id
    }

    const updated = await Blog.findByIdAndUpdate(request.params.id, entry)
    response.json(updated)
})

//Defines the get request. Uses the blog schema to get all the notes
//Async/await syntax
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('users')
    response.json(blogs)
})

//Defines the post request using the blog schema
//Async/await syntax 
blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const userId = request.user.id

    const user = await User.findById(userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        users: user._id
    })

    const newEntry = await blog.save()
    user.blogs = user.blogs.concat(newEntry._id)
    await user.save()

    const populatedEntry = await Blog.findById(newEntry._id).populate('users')

    response.status(201).json(populatedEntry)
})

blogsRouter.post('/:id/comments', async (request, response) => {

    const body = request.body
    const postId = request.params.id

    const blog = await Blog.findById(postId)

    if (!blog) return response.status(404).json("Resource not found")

    blog.comments = blog.comments.concat(body.comment);

    await blog.save()

    response.status(201).json(blog)
})

module.exports = blogsRouter