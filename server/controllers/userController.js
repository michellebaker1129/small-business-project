import schema from "../models/User.js";

export async function getAllUsers() {
  const results = await schema.userMany()
    // .populate("posts")
    // .populate("images")
  return results;
}

export async function getSingleUser(req, res) {
  try {
    const dbUserData = await schema.findOne({ _id: req.params.userId })
      .populate("posts")
      .populate("images");
    if (!dbUserData) {
      return res.status(500).json({ message: "no user found with that ID" });
    }
    res.json(dbUserData);
  } catch (err) {
    res.json(err);
  }
}

export async function createUser(body) {
  try {
    const newUser = await schema.create(body);
    return newUser;
  } catch (err) {
    console.log(err);
  }
}

export function updateUser(req, res) {
  schema.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { new: true, runValidators: true }
  )
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
}

export function deleteUser(req, res) {
  schema.findOneAndDelete({ _id: req.params.userId })
    .then(() => res.json({ message: "User deleted" }))
    .catch((err) => {
      res.status(500).json(err);
    });
}
