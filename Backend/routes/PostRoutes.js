import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";   // <-- FIX: import User
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ------------------ Create Post ------------------ */
router.post("/", verifyToken, async (req, res) => {
  try {
    const newPost = new Post({
      userId: req.user.id || req.user._id,
      content: req.body.content,
      image: req.body.image,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ Get All Posts ------------------ */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ Get News Feed ------------------ */
// ⚠️ put BEFORE /:id route
router.get("/feed", verifyToken, async (req, res) => {
  try {
    // find current user
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // get posts from followed users + own posts
    const feedPosts = await Post.find({
      userId: { $in: [...currentUser.following, req.user.id] }
    })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.json(feedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ Update Post ------------------ */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId.toString() !== (req.user.id || req.user._id)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    post.content = req.body.content || post.content;
    post.image = req.body.image || post.image;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ Delete Post ------------------ */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId.toString() !== (req.user.id || req.user._id)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ Like / Unlike Post ------------------ */
router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.user.id || req.user._id;
    const userIdStr = userId.toString();

    if (post.likes.map(id => id.toString()).includes(userIdStr)) {
      // unlike
      post.likes = post.likes.filter(uid => uid.toString() !== userIdStr);
      await post.save();
      return res.json({ message: "Post unliked", likes: post.likes });
    }

    // like
    post.likes.push(userId);
    await post.save();
    res.json({ message: "Post liked", likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ Get all posts by a specific user ------------------ */
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).populate("userId", "username email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ Get single post ------------------ */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("userId", "username email");
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
