const { Schema, model } = require('mongoose');
// Schemas define the shape of the documents within the collection.

const PostSchema = new Schema({
  // Schemas define the properties of the document
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postContent: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  toJSON: {
    getters:true
  }, 
  id:false
}
);  

// Create model using mongoose.model()
const Post = model('Post', PostSchema);

module.exports = Post;