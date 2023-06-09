import { model } from "mongoose";

// const { model } = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
    // trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  phoneNumber: { 
    type: String,
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

export { User };

// const User = model("User", {
//   fullname: { type: String },
//   email: { type: String, unique: true },
//   phoneNumber: { type: String },
//   address: { type: String },
//   address2: { type: String, default: "" },
//   city: { type: String },
//   state: { type: String },
//   zip: { type: String },
//   country: { type: String },
//   role: { type: String },
//   password: { type: String },
//   token: { type: String },
//   createdAt: { type: String },
//   updatedAt: { type: String },
// });
