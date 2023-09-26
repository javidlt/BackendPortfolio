const {Schema, model} = require('mongoose');

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["ia", "web", "frontend", "backend", "other"]
    }
}, {
    timestamps: true
})

module.exports = model('Project', ProjectSchema);