const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    title: { type: String, required: true,},
    content: { type: String, required: true,},
    date: { type: Date, required: true,},
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    likes: { type: Number},
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;