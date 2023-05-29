import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    user_getAllUsers() {
      return getAllUsers();
    },
    user_getUserById(parent, args) {
      return getSingleUser({ _id: args.id });
    },
    post_getAllPostsByUserId(parent, args) {
      return Post.find({ userId: args.id });
    },
    post_getPostById(parent, args) {
      return Post.findOne({ _id: args.id });
    },
    image_getAllImagesByUserId(parent, args) {
      return Image.find({ userId: args.id });
    },
    image_getImageById(parent, args) {
      return Image.findOne({ _id: args.id });
    }
  },
  Mutation: {
    user_createUser(parent, args) {
      return User.create(args)
    },
    user_updateUser(parent, args) {
      return User.findOneAndUpdate({ _id: args.id }, args, { new: true });
    },
    user_deleteUser(parent, args) {
      return User.findOneAndDelete({ _id: args.id });
    },
    post_createPost(parent, args) {
      const post = new Post(args);
      return post.save();
    },
    post_updatePost(parent, args) {
      return Post.findOneAndUpdate({ _id: args.id }, args, { new: true });
    },
    post_deletePost(parent, args) {
      return Post.findOneAndDelete({ _id: args.id });
    },
    image_createImage(parent, args) {
      const image = new Image(args);
      return image.save();
    },
    image_deleteImage(parent, args) {
      return Image.findOneAndDelete({ _id: args.id });
    }
  }
};

export { resolvers };
