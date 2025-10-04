import express from "express";
import Post from "../models/Post.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // For media uploads

// Create Post
router.post("/", verifyToken, upload.single("media"), async (req, res) => {
  try {
    const newPost = new Post({
      user: req.user.id,
      content: req.body.content,
      media: req.file?.path
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) { res.status(500).json(err); }
});

// Get timeline posts (user + following)
router.get("/timeline", verifyToken, async (req, res) => {
  try {
    const userPosts = await Post.find({ user: req.user.id });
    const followingPosts = await Post.find({ user: { $in: req.user.following } });
    res.json(userPosts.concat(followingPosts).sort((a,b)=>b.createdAt-a.createdAt));
  } catch (err) { res.status(500).json(err); }
});

// Like post
router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      await post.save();
      res.json({ message: "Post liked" });
    } else {
      res.status(400).json({ error: "Already liked" });
    }
  } catch (err) { res.status(500).json(err); }
});

// Comment
router.put("/:id/comment", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();
    res.json(post);
  } catch (err) { res.status(500).json(err); }
});

export default router;
