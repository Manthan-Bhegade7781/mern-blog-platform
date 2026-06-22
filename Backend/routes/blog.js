const express= require("express");
const BLOG = require("../models/blog");
const upload = require("../middleware/upload");

const router= express.Router();

router.post('/add-blog',upload.single("coverImage"), async (req,res)=>{
    const {title, body}= req.body;
    const blog = await BLOG.create({
      title,
      body,
      coverImage: `/uploads/${req.file.filename}`,
      createdBy: req.user.id,
    });

    return res.json({
      message: "Blog Created Successfully",
    });
});

router.get("/", async (req, res) => {
try {
    const blogs = await BLOG.find({})
        .populate("createdBy", "fullName")
        .sort({ createdAt: -1 });

    return res.status(200).json(blogs);

} catch (error) {

    return res.status(500).json({
        message: "Something went wrong",
    });
}
});

router.get("/search/:query", async (req, res) => {
    try {
    const blogs = await BLOG.find({
    title: {
        $regex: req.params.query,
        $options: "i",
    },
    }).populate("createdBy", "fullName");

    return res.json(blogs);

    } catch (error) {

    return res.status(500).json({
    message: "Something went wrong",
    });
    }
});


router.get("/:id", async (req, res) => {
try {
    const blog = await BLOG.findById(req.params.id)
        .populate("createdBy", "fullName email");

    if (!blog) {
        return res.status(404).json({
            message: "Blog Not Found"
        });
    }

    return res.status(200).json(blog);

} catch (error) {

    return res.status(500).json({
        message: "Something went wrong"
    });
}
});

router.delete("/:id", async (req, res) => {
    const blog = await BLOG.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({
        message: "Blog Not Found",
        });
    }

    if (blog.createdBy.toString() !== req.user.id) {
        return res.status(403).json({
        message: "Unauthorized",
        });
    }

    await BLOG.findByIdAndDelete(req.params.id);

    return res.json({
    message: "Blog Deleted Successfully",
    });
});

router.put("/:id", async (req, res) => {
    try {
    const blog = await BLOG.findById(req.params.id);

    if (!blog) {
    return res.status(404).json({
        message: "Blog not found",
    });
    }

    if (blog.createdBy.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Unauthorized",
        });
    }

    const { title, body } = req.body;

    blog.title = title;
    blog.body = body;

    await blog.save();

    return res.json({
    message: "Blog Updated Successfully",
    blog,
    });


    } catch (error) {


    return res.status(500).json({
    message: "Something went wrong",
    });


    }
});



module.exports= router;