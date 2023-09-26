const {Schema, model} = require('mongoose');

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: [
        {
            type: String,
            required: true
        }
    ]
}, {
    timestamps: true
})

module.exports = model('Blog', BlogSchema);