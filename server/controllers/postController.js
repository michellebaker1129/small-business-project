const { Post, User, Image } = require("../models");
module.exports = {
    // get all Posts
    getAllPosts(req, res) {
      Post.find()
        .populate("images")
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => res.status(500).json(err));
    },
    getSinglePost(req, res) {
      Post.findOne({ _id: req.params.postId })
        .populate("images")
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => res.status(500).json(err));
    },
    createPost(req, res) {
        // TODO create image and add to user and post
        // req.body:
        // {
        //     "userId": "60f1b2b7f3e9a5b4a4f9f8b1",
        //     "content": "content including images",
        //     "images": [
        //         {
        //            "userId": "some user id",
        //            "image": "some base64 string",
        //         }
        //     ]
        // }
        // TODO add `postId: dbPostData._id` to each image
        Post.create(req.body)
            .then((dbPostData) => {
                // loop over req.body.images and add postId: dbPostData._id to each image
                req.body.images.forEach((image) => {
                    image.postId = dbPostData._id;
                });

                // TODO add images to Post and User (research if we can just add images to Post)

                return User.findOneAndUpdate(
                    {
                        _id: req.body.userId,
                    },
                    {
                        $push: { posts: dbPostData._id },
                        $push: { images: req.body.images },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    updatePost(req, res) {
        Post.findOneAndUpdate(
            {
                _id: req.params.postId,
            },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    //use $pull like in the users
    // delete the Post from the user who owns it
    deletePost(req, res) {
        Post.findOneAndDelete({ _id: req.params.PostId })
            .then((dbPostData) => {
                // find the user who owns the Post
                // delete the Post from their Post array
                // delete any images associated with the Post
                // delete the Post
                Promise.all([
                    User.findOneAndUpdate(
                        {
                            _id: dbPostData.userId,
                        },
                        {
                            $pull: {
                                Post: req.params.postId,
                            },
                        }
                    ),
                    Image.deleteMany({ postId: req.params.postId }),
                ])
                    .then(([dbUserData, dbImageData]) => {
                        res.json({ message: "Successfully deleted post" });
                    })
                    .catch((err) => res.status(500).json(err));
            })
    },

    // TODO get all images by user id
    // GET /api/users/:userId/images

    // TODO get all images by post id
    // GET /api/posts/:postId/images

    // TODO get image by id
};