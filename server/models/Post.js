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
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  postType: {
    type: String,
    required: true,
    enum: ['client', 'contract', 'invoice', 'admin'],
    default: 'client',
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Image'
    }
  ],
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