const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/User.js");
const { Post } = require("../models/Post.js");
const { Comment } = require("../models/Comment.js");
const { Image } = require("../models/Image.js");
const { USER_ALREADY_EXISTS, USER_DOESNT_EXIST, PASSWORD_SALT, INCORRECT_PASSWORD, USER_ROLES } = require("../utils/constants.js");

// GraphQL Resolvers
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, args) => await User.findById(args.id),
    getAllUsers: async (_, args) => {
      const adminId = args.id;
      const admin = await User.findById(adminId);
      if (!admin) {
        throw new Error(`User with ID ${adminId} not found`);
      }
      if (admin.role !== USER_ROLES.ADMIN) {
        throw new Error(`User with ID ${adminId} is not an admin`);
      }
      const clients = await User.find({
        // filter out admin users
        role: { $ne: USER_ROLES.ADMIN },
      });
      return clients;
    },
    getUserById: async (_, args) => {
      const { clientId, adminId } = args;
      // check if admin exists
      const admin = await User.findById(adminId);
      if (!admin) {
        throw new Error(`User with ID ${adminId} not found`);
      }

      // check if admin is admin
      if (admin.role !== USER_ROLES.ADMIN) {
        throw new Error(`User with ID ${adminId} is not an admin`);
      }
      
      // check if client exists
      const client = await User.findById(clientId);
      // return client info
      if (!client) { 
        throw new Error(`User with ID ${clientId} not found`);
      }
      return client;
    },

    posts: async () => await Post.find({}),
    post: async (_, args) => await Post.findById(args.id),
    getAllPostsByConversationParticipantIds: async (_, args) => {
      // TODO add pagination
      const { userId, secondUserId } = args;

      const posts = await Post.find({
        $or: [
          { senderId: userId, receiverId: secondUserId },
          { senderId: secondUserId, receiverId: userId },
        ],
      })
        .sort({ createdAt: -1 });
      
      return posts;
    },

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
        role: USER_ROLES.CLIENT,
      });

      // create jwt (attach to user model)
      const token = jwt.sign(
        {
          user_id: newUser._id,
          role: newUser.role,
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
          role: foundUser.role,
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

    createPost: async (_, { message, userId, imageUrls }) => {
      // loop through images and create them
      const newImages = [];

      // TODO maybe reuse this?
      for (let i = 0; i < imageUrls.length; i++) {
        const newImage = new Image({
          url: imageUrls[i], // /images/1234.jpg
          userId,
        });
        await newImage.save();
        newImages.push(newImage);
      }

      const newPost = new Post({
        message,
        userId,
        images: newImages,
      });
      await newPost.save();
      return newPost;
    },

    sendMessage: async (_, {messageInput: { senderId, message, receiverId }}) => {
      // check if sender exists
      const sender = await User.findById(senderId);

      // check if receiver exists
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        throw new Error(`User with ID ${receiverId} not found`);
      }

      // check if sender is admin or receiver is admin
      if (sender.role !== USER_ROLES.ADMIN && receiver.role !== USER_ROLES.ADMIN) {
        throw new Error("Messages cannot be sent between two clients");
      }

      // create message
      const newMessage = new Post({
        senderId,
        message,
        receiverId,
      });
      
      // save message to sender and receiver
      await newMessage.save();
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
