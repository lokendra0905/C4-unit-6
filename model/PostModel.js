const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: { type: 'string', required: true },
    body: { type: 'string', required: true },
    device: { type: 'string', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, {
    versionKey: false
})


const Post = mongoose.model('Post', postSchema)

module.exports = { Post }