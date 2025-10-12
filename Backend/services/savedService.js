import User from "../models/User.js";
import Post from "../models/Post.js";

export const savePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found ❌" });

    if (!user.savedPosts) user.savedPosts = [];

    const alreadySaved = user.savedPosts.includes(postId);
    if (alreadySaved) {
      return res.status(400).json({ success: false, message: "Post already saved ❌" });
    }

    user.savedPosts.push(postId);
    await user.save();

    res.status(200).json({ success: true, message: "Post saved successfully ✅" });
  } catch (err) {
    console.error("🔥 Save post error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const unsavePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found ❌" });

    user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId);
    await user.save();

    res.status(200).json({ success: true, message: "Post removed from saved posts ✅" });
  } catch (err) {
    console.error("🔥 Unsave post error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getSavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedPosts");

    if (!user) return res.status(404).json({ success: false, message: "User not found ❌" });

    res.status(200).json({
      success: true,
      message: "Saved posts fetched successfully ✅",
      savedPosts: user.savedPosts
    });
  } catch (err) {
    console.error("🔥 Get saved posts error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
