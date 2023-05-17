const { Thought, User } = require("../models");

const thoughtController = {

  getAllThoughts(req, res) {
    Thought.find({}).populate({path: "reactions", select: "-__v",}).select("-__v").sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },


  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id }).populate({path: "reactions",select: "-__v"}).select("-__v")
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


  // async createThought(req, res) {
  //   try {
  //     const thoughtData = await Thought.create(req.body)
  //     const userData = await User.findOneAndUpdate(
  //       { _id: req.body.userId },
  //       { $push: { thoughts: thoughtData._id } },
  //       { new: true }
  //     );
  //     if (!userData) {
  //       return res
  //         .status(404)
  //         .json({ message: "Thought created but unable to associate to user" });
  //     }
  //     res.json({ message: "Thought created!" });
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },

  createThought({body}, res) {
    Thought.create(body)
    .then(({_id})=> {
      return User.findOneAndUpdate(
        {_id: req.body.userId},
        { $push: {thoughts: _id}},
        {new: true}
      );
    })
    .then((UserData) => {
      if(!UserData){
        return res.status(404).json({message: "Thought created but unable to associate to user"});
      }
      res.json({ message: "Thought created"});
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
          return res.status(404).json({ message: "No thought found" })
        }
      })
          .then (() => {
            res.json({ message: "Thought deleted"});
        })
        .catch((err) => res.json(err));
        },

   
  //       return User.findOneAndUpdate(
  //         { thoughts: params.id },
  //         { $pull: { thoughts: params.id } }, 
  //         { new: true }
  //       );
  //     })
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         return res
  //           .status(404)
  //           .json({ message: "Thought created but unable to associate to user" });
  //       }
  //       res.json({ message: "Thought deleted" });
  //     })
  //     .catch((err) => res.json(err));
  // },


  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { thoughts: { reactionsBody: params.reactions } } },
      { new: true}
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


  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { thoughts: { reactionsBody: params.reactions } } },
      { new: true }
    )
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;