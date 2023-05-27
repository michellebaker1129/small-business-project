const { Post, User } = require("../models");
module.exports = {
    // get all Posts
    getAllPost(req, res) {
      Post.find()
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => res.status(500).json(err));
    },
    getSinglePost(req, res) {
      Post.findOne({ _id: req.params.postId })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => res.status(500).json(err));
    },
    createPost(req, res) {
        Post.create(req.body)
            .then((dbPostData) => {
                return User.findOneAndUpdate(
                    {
                        _id: req.body.userId,
                    },
                    {
                        $push: { posts: dbPostData._id },
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
                    Reaction.deleteMany({ postId: req.params.postId }),
                ])
                    .then(([dbUserData, dbReactionData]) => {
                        res.json({ message: "Successfully deleted post" });
                    })
                    .catch((err) => res.status(500).json(err));
            })
    },

    //match add 
    async addReaction(req, res) { 
        try {
            const dbPostData = await Post.findOneAndUpdate(
                {
                    _id: req.params.postId
                }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {
                runValidators: true,
                new: true
            });

            return res.json(dbPostData);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
        
    //try to send messages when i can 
    // .then
    // .catch

    deleteReaction(req, res) {
        Post.findOneAndUpdate(
            {
                _id: req.params.postId,
            },
            {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId,
                    },
                },
            },
            {
                runValidators: true,
                new: true,
            }
        )
            .then((dbPostData) => {
                if (!dbPostData) {
                    res.status(404).json({ message: "No Post found with this id" });
                    return;
                }
                res.json({ message: "Successfully deleted the reaction" });
            })
            .catch((err) => res.status(500).json(err));
    },
};