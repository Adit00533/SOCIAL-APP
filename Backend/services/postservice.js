import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    if (!content && !image) {
      return res.status(400).json({ success: false, message: "Post content or media is required ❌" });
    }

    const newPost = new Post({
      userId: req.user.id || req.user._id,
      content: content?.trim() || "",
      image: image || "",
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully ✅",
      post: savedPost,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error during post creation",
      error: err.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch posts", error: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const currentUserId = req.user.id || req.user._id;
    const user = await User.findById(currentUserId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get posts from the user and users they follow
    const followingIds = user.following || [];

    const posts = await Post.find({
      userId: { $in: [...followingIds, currentUserId] },
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch feed posts", error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const currentUserId = req.user.id || req.user._id;
    const { content, image } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (post.userId.toString() !== currentUserId.toString()) {
      return res.status(403).json({ success: false, message: "You can only update your own posts" });
    }

    if (content !== undefined) post.content = content.trim();
    if (image !== undefined) post.image = image;

    const updatedPost = await post.save();

    res.status(200).json({ success: true, message: "Post updated", post: updatedPost });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update post", error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const currentUserId = req.user.id || req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (post.userId.toString() !== currentUserId.toString()) {
      return res.status(403).json({ success: false, message: "You can only delete your own posts" });
    }

    await post.deleteOne();

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete post", error: err.message });
  }
};

export const toggleLikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const currentUserId = req.user.id || req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (post.likes.includes(currentUserId)) {
      // Unlike post
      post.likes = post.likes.filter(id => id.toString() !== currentUserId.toString());
    } else {
      // Like post
      post.likes.push(currentUserId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: post.likes.includes(currentUserId) ? "Post liked" : "Post unliked",
      likesCount: post.likes.length,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to toggle like", error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await Post.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch user posts", error: err.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch post", error: err.message });
  }
};
