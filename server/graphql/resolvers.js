const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/User.js");
const { Post } = require("../models/Post.js");
const { Comment } = require("../models/Comment.js");
const { Image } = require("../models/Image.js");
const { USER_ALREADY_EXISTS, USER_DOESNT_EXIST, PASSWORD_SALT, INCORRECT_PASSWORD } = require("../utils/constants.js");

// GraphQL Resolvers
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, args) => await User.findById(args.id),
    posts: async () => await Post.find({}),
    post: async (_, args) => await Post.findById(args.id),
    images: async () => await Image.find({}),
    image: async (_, args) => await Image.findById(args.id),
    comments: async () => await Comment.find({}),
    comment: async (_, args) => await Comment.findById(args.id),
  },
  Mutation: {
    createUser: async (_, args) => {
      const {
        fullname,
        email,
        password,
        phoneNumber,
        address,
        address2,
        city,
        state,
        zip,
        country,
        role,
      } = args;
      const newUser = new User({
        fullname,
        email,
        password,
        phoneNumber,
        address,
        address2,
        city,
        state,
        zip,
        country,
        role,
      });
      await newUser.save();
      return newUser;
    },

    registerUser: async (_, { registerInput: { email, password } }) => {
      // check if user exists
      const oldUser = await User.findOne({ email });

      // throw error if user exists
      if (oldUser) {
        throw new ApolloError("A user is already registered with the email: " + email, USER_ALREADY_EXISTS);
      }

      // encrypt password
      const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT);

      // build mongoose model
      const newUser = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      // create jwt (attach to user model)
      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
        },
        process.env.JWT_STRING || "UNSAFE_STRING",
        {
          expiresIn: "2h",
        }
      );

      newUser.token = token;

      // save user in mongodb
      const res = await newUser.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },

    loginUser: async (_, { loginInput: { email, password } }) => {
      // check if user exists
      const foundUser = await User.findOne({ email });

      // throw error if user doesn't exist
      if (!foundUser) {
        throw new ApolloError("No user found with the email: " + email, USER_DOESNT_EXIST);
      }

      // check if password is correct
      const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

      // throw error if password is incorrect
      if (!isPasswordCorrect) {
        throw new ApolloError("Incorrect password", INCORRECT_PASSWORD);
      }

      // create jwt (attach to user model)
      const token = jwt.sign(
        {
          user_id: foundUser._id,
          email,
        },
        process.env.JWT_STRING || "UNSAFE_STRING",
        {
          expiresIn: "2h",
        }
      );

      foundUser.token = token;

      return {
        ...foundUser._doc,
        id: foundUser._id,
      };
    },

    updateUser: async (_, args) => {
      const { id } = args;
      const updatedUser = await User.findByIdAndUpdate(id, args);
      if (!updatedUser) {
        throw new Error(`User with ID ${id} not found`);
      }
      return updatedUser;
    },

    deleteUser: async (_, { id }) => {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new Error(`User with ID ${id} not found`);
      }

      // delete all posts, comments, and images associated with user
      await Post.deleteMany({ userId: id });
      await Comment.deleteMany({ userId: id });
      await Image.deleteMany({ userId: id });
      return deletedUser;
    },

    createPost: async (_, { message, userId, comments, imageUrls }) => {
      // loop through images and comments and create them
      const newComments = [];
      const newImages = [];

      for (let i = 0; i < comments.length; i++) {
        const newComment = new Comment({
          message: comments[i].message,
          userId,
          postId: comments[i].postId,
        });
        await newComment.save();
        newComments.push(newComment);
      }

      for (let i = 0; i < imageUrls.length; i++) {
        const newImage = new Image({
          url: imageUrls[i],
          userId,
        });
        await newImage.save();
        newImages.push(newImage);
      }

      const newPost = new Post({
        message,
        userId,
        comments: newComments,
        images: newImages,
      });
      await newPost.save();
      return newPost;
    },

    updatePost: async (_, args) => {
      const { id } = args;
      const updatedPost = await Post.findByIdAndUpdate(id, args);
      if (!updatedPost) {
        throw new Error(`Post with ID ${id} not found`);
      }
      return updatedPost;
    },

    deletePost: async (_, { id }) => {
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        throw new Error(`Post with ID ${id} not found`);
      }
      return deletedPost;
    },

    createComment: async (_, { message, userId, postId }) => {
      const newComment = new Comment({
        message,
        userId,
        postId,
      });
      await newComment.save();
      return newComment;
    },

    updateComment: async (_, args) => {
      const { id } = args;
      const updatedComment = await Comment.findByIdAndUpdate(id, args);
      if (!updatedComment) {
        throw new Error(`Comment with ID ${id} not found`);
      }
      return updatedComment;
    },

    deleteComment: async (_, { id }) => {
      const deletedComment = await Comment.findByIdAndDelete(id);
      if (!deletedComment) {
        throw new Error(`Comment with ID ${id} not found`);
      }
      return deletedComment;
    },

    createImage: async (_, { url, postId }) => {
      const newImage = new Image({
        url,
        postId,
      });
      await newImage.save();
      return newImage;
    },

    updateImage: async (_, args) => {
      const { id } = args;
      const updatedImage = await Image.findByIdAndUpdate(id, args);
      if (!updatedImage) {
        throw new Error(`Image with ID ${id} not found`);
      }
      return updatedImage;
    },

    deleteImage: async (_, { id }) => {
      const deletedImage = await Image.findByIdAndDelete(id);
      if (!deletedImage) {
        throw new Error(`Image with ID ${id} not found`);
      }
      return deletedImage;
    },
  },
};

module.exports = { resolvers };
