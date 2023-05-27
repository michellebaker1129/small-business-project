const { Schema, model } = require('mongoose');

// Schemas define the shape of the documents within the collection.
const ImageSchema = new Schema(
  {
    // Schemas define the properties of the document
    image: {
      type: String,
      required: true,
      trim: true
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      virtuals: true
    },
  }
);

// Create model using mongoose.model()
const Image = model('Image', ImageSchema);

module.exports = Image;