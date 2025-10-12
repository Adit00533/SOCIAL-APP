import User from "../models/User.js";
import Post from "../models/Post.js";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    console.log("🚀 Get profile for user:", userId);

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found ❌" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("🔥 Get profile error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    console.log("🚀 Update profile request:", req.body);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found ❌" });

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;

    const updatedUser = await user.save();
    console.log("✅ Profile updated:", updatedUser._id);
    res.status(200).json({ success: true, message: "Profile updated successfully ✅", user: updatedUser });
  } catch (err) {
    console.error("🔥 Update profile error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) return res.status(400).json({ success: false, message: "Search query is required ❌" });

    const users = await User.find({ username: { $regex: query, $options: "i" } }).select("username email");

    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    console.error("🔥 Search users error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) return res.status(400).json({ success: false, message: "Search query is required ❌" });

    const posts = await Post.find({ content: { $regex: query, $options: "i" } }).populate("userId", "username email");

    res.status(200).json({ success: true, count: posts.length, posts });
  } catch (err) {
    console.error("🔥 Search posts error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const currentUserId = req.user.id || req.user._id;
    const targetUserId = req.params.id;

    if (currentUserId === targetUserId)
      return res.status(400).json({ success: false, message: "You can't follow yourself ❌" });

    const userToFollow = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser)
      return res.status(404).json({ success: false, message: "User not found ❌" });

    if (userToFollow.followers.includes(currentUserId))
      return res.status(400).json({ success: false, message: "Already following ⚠️" });

    userToFollow.followers.push(currentUserId);
    currentUser.following.push(targetUserId);

    await userToFollow.save();
    await currentUser.save();

    console.log(`✅ ${currentUser.username} followed ${userToFollow.username}`);
    res.status(200).json({ success: true, message: "User followed successfully ✅" });
  } catch (err) {
    console.error("🔥 Follow user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.user.id || req.user._id;
    const targetUserId = req.params.id;

    if (currentUserId === targetUserId)
      return res.status(400).json({ success: false, message: "You can't unfollow yourself ❌" });

    const userToUnfollow = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser)
      return res.status(404).json({ success: false, message: "User not found ❌" });

    if (!userToUnfollow.followers.includes(currentUserId))
      return res.status(400).json({ success: false, message: "You are not following this user ⚠️" });

    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId);
    currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);

    await userToUnfollow.save();
    await currentUser.save();

    console.log(`✅ ${currentUser.username} unfollowed ${userToUnfollow.username}`);
    res.status(200).json({ success: true, message: "User unfollowed successfully ✅" });
  } catch (err) {
    console.error("🔥 Unfollow user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id || req.user._id;
    const currentUser = await User.findById(currentUserId);

    const suggestions = await User.find({
      _id: { $nin: [...currentUser.following, currentUserId] }
    }).select("username email");

    res.status(200).json({ success: true, count: suggestions.length, suggestions });
  } catch (err) {
    console.error("🔥 Suggested users error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
