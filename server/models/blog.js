const mongoose = require('mongoose')

//Defines the blog shcema
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: Array
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)