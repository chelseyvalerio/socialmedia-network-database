const router = require("express").Router();

const {
    getAllUsers, getAllUserById, createUser, updatedUser, deleteUser, addFollower, removeFollower,} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getAllUserById).put(updatedUser).delete(deleteUser);
router.route("/:userId/followerId").post(addFollower).delete(removeFollower);

module.exports = router;