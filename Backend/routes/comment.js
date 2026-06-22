const express = require("express");
const Comment = require("../models/comment");

const router = express.Router();

router.post("/:blogId", async (req, res) => {
    try {

    if (!req.user) {
        return res.status(401).json({
            message: "Please login to comment",
        });
    }

    const { content } = req.body;

    const comment = await Comment.create({
        content,
        createdBy: req.user.id,
        blogId: req.params.blogId,
    });

    return res.status(201).json({
    message: "Comment Added Successfully",
    comment,
    });

    } catch (error) {

    return res.status(500).json({
    message: "Something went wrong",
    });

    }
});

router.get("/:blogId", async (req, res) => {

const comments = await Comment.find({
blogId: req.params.blogId,
})
.populate("createdBy", "fullName")
.sort({ createdAt: -1 });

return res.json(comments);
});

router.delete("/:id", async (req, res) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
    return res.status(404).json({
    message: "Comment not found",
    });
    }

    if (comment.createdBy.toString() !== req.user.id) {
    return res.status(403).json({
    message: "Unauthorized",
    });
    }

    await Comment.findByIdAndDelete(req.params.id);

    return res.json({
    message: "Comment deleted successfully",
    });
});


module.exports = router;
