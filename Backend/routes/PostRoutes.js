import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ===========================
   CREATE POST
=========================== */
router.post("/", verifyToken, async (req, res) => {
  console.log("🚀 Create post request:", req.body);

  try {
    const { content, image } = req.body;

    if (!content && !image) {
      console.warn("⚠️ Post content and image missing");
      return res.status(400).json({ success: false, message: "Post content or media is required ❌" });
    }

    const newPost = new Post({
      userId: req.user.id || req.user._id,
      content: content?.trim() || "",
      image: image || "",
    });

    const savedPost = await newPost.save();
    console.log("✅ Post created:", savedPost._id);

    res.status(201).json({
      success: true,
      message: "Post created successfully ✅",
      post: savedPost,
    });
  } catch (err) {
    console.error("🔥 Create post error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during post creation",
      error: err.message,
    });
  }
});

/* ===========================
   GET ALL POSTS
=========================== */
router.get("/", async (req, res) => {
  console.log("🚀 Fetch all posts");

  try {
    const posts = await Post.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      message: "All posts fetched successfully ✅",
      posts,
    });
  } catch (err) {
    console.error("🔥 Get posts error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching posts",
      error: err.message,
    });
  }
});

/* ===========================
   GET FEED POSTS (SELF + FOLLOWING)
=========================== */
router.get("/feed", verifyToken, async (req, res) => {
  console.log("🚀 Fetch feed for user:", req.user.id || req.user._id);

  try {
    const currentUser = await User.findById(req.user.id || req.user._id);
    if (!currentUser) {
      console.warn("❌ User not found:", req.user.id || req.user._id);
      return res.status(404).json({ success: false, message: "User not found ❌" });
    }

    const feedPosts = await Post.find({
      userId: { $in: [...currentUser.following, req.user.id || req.user._id] },
    })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    console.log(`✅ Feed posts fetched: ${feedPosts.length}`);
    res.status(200).json({
      success: true,
      count: feedPosts.length,
      message: "Feed fetched successfully 📰",
      posts: feedPosts,
    });
  } catch (err) {
    console.error("🔥 Feed fetch error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching feed",
      error: err.message,
    });
  }
});

/* ===========================
   UPDATE POST
=========================== */
router.put("/:id", verifyToken, async (req, res) => {
  console.log("🚀 Update post request:", req.params.id, req.body);

  try {
    const { content, image } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ success: false, message: "Post not found ❌" });

    if (post.userId.toString() !== (req.user.id || req.user._id)) {
      console.warn("⚠️ Unauthorized update attempt by user:", req.user.id || req.user._id);
      return res.status(403).json({ success: false, message: "You are not authorized ⚠️" });
    }

    post.content = content?.trim() || post.content;
    post.image = image || post.image;

    const updatedPost = await post.save();
    console.log("✅ Post updated:", updatedPost._id);

    res.status(200).json({
      success: true,
      message: "Post updated successfully ✏️",
      post: updatedPost,
    });
  } catch (err) {
    console.error("🔥 Update post error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating post",
      error: err.message,
    });
  }
});

/* ===========================
   DELETE POST
=========================== */
router.delete("/:id", verifyToken, async (req, res) => {
  console.log("🚀 Delete post request:", req.params.id);

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found ❌" });

    if (post.userId.toString() !== (req.user.id || req.user._id)) {
      console.warn("⚠️ Unauthorized delete attempt by user:", req.user.id || req.user._id);
      return res.status(403).json({ success: false, message: "You are not authorized ⚠️" });
    }

    await post.deleteOne();
    console.log("🗑️ Post deleted:", post._id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully 🗑️",
    });
  } catch (err) {
    console.error("🔥 Delete post error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting post",
      error: err.message,
    });
  }
});

/* ===========================
   LIKE / UNLIKE POST
=========================== */
router.put("/:id/like", verifyToken, async (req, res) => {
  console.log("🚀 Like/unlike post:", req.params.id);

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found ❌" });

    const userId = (req.user.id || req.user._id).toString();
    const alreadyLiked = post.likes.some(id => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(uid => uid.toString() !== userId);
      await post.save();
      console.log("💔 Post unliked:", post._id);
      return res.status(200).json({
        success: true,
        message: "Post unliked 💔",
        likesCount: post.likes.length,
      });
    }

    post.likes.push(userId);
    await post.save();
    console.log("❤️ Post liked:", post._id);

    res.status(200).json({
      success: true,
      message: "Post liked ❤️",
      likesCount: post.likes.length,
    });
  } catch (err) {
    console.error("🔥 Like/unlike post error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while liking/unliking post",
      error: err.message,
    });
  }
});

/* ===========================
   GET ALL POSTS BY SPECIFIC USER
=========================== */
router.get("/user/:userId", async (req, res) => {
  console.log("🚀 Get posts by user:", req.params.userId);

  try {
    const posts = await Post.find({ userId: req.params.userId })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      message: "User posts fetched successfully 🧑‍💻",
      posts,
    });
  } catch (err) {
    console.error("🔥 Get user posts error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user posts",
      error: err.message,
    });
  }
});

/* ===========================
   GET SINGLE POST
=========================== */
router.get("/:id", async (req, res) => {
  console.log("🚀 Get single post:", req.params.id);

  try {
    const post = await Post.findById(req.params.id).populate("userId", "username email");
    if (!post) return res.status(404).json({ success: false, message: "Post not found ❌" });

    res.status(200).json({
      success: true,
      message: "Post fetched successfully ✅",
      post,
    });
  } catch (err) {
    console.error("🔥 Get single post error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching post",
      error: err.message,
    });
  }
});

export default router;
