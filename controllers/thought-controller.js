const { Thought, User } = require("../models");

const thoughtController = {

  getAllThoughts(req, res) {
    Thought.find({}).populate({path: "thoughts", select: "-__v"}).select("-__v").sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },


  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id }).populate({path: "thoughts",select: "-__v"}).select("-__v")
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought found" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },


  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but unable to associate to user" });
        }

        res.json({ message: "Thought created!" });
      })
      .catch((err) => res.json(err));
  },


  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },


  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought found" });
        }

   
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } }, 
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but unable to associate to user" });
        }
        res.json({ message: "Thought deleted" });
      })
      .catch((err) => res.json(err));
  },


  addEmoji({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { thought: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },


  removeEmoji({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { thoughts: { emojiId: params.emojiId } } },
      { new: true }
    )
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;