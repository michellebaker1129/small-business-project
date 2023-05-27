const { Schema, model } = require('mongoose');

// Schemas define the shape of the documents within the collection.
const UserSchema = new Schema(
  {
    // Schemas define the properties of the document
    fullname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/,"please provide a valid email address"]
    },
    addressStreet: {
      type: String,
      required: true,
      trim: true
    },
    addressStreet2: {
      type: String,
      trim: true
    },
    addressCity: {
      type: String,
      required: true,
      trim: true
    },
    addressState: {
      type: String,
      required: true,
      trim: true
    },
    addressZip: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      // TODO: add regex to validate phone number
      match: [/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,"please provide a valid phone number"]
    },
    passwordHash: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Image'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date
    }
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