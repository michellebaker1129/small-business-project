const { Schema, model } = require('mongoose');

// Schemas define the shape of the documents within the collection.
const UserSchema = new Schema(
  {
    // Schemas define the properties of the document
    username: {
      type: String,
      required: true,
      unique:true,
      trim:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/,"please provide a valid email address"]
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }, 
    id: false,
  }
);

// Create model using mongoose.model()
const User = model('User', UserSchema);

module.exports = User;