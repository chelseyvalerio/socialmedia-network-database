const router = require("express").Router();

const {
    getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addEmoji, removeEmoji,} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(createThought);
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);
router.route("/:thoughtId/emoji").post(addEmoji);
router.route("/:thoughtId/emoji/:emojiId").delete(removeEmoji);

module.exports = router