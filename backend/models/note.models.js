const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title : {
        type: String ,
        required :true,
        unique: true
    }, 
    content: {
        type : String, 
        required: true
    } , 
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

// Create a model from the schema
const Note = mongoose.model('Note', noteSchema);

// Export the model
module.exports = Note; 