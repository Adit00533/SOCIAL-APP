import Story from "../models/Story.js";
import User from "../models/User.js";

export const createStory = async (req, res) => {
  try {
    const { media, caption } = req.body;
    if (!media) {
      return res.status(400).json({ success: false, message: "Media is required ❌" });
    }

    const story = new Story({
      user: req.user.id,
      media,
      caption,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires in 24h
    });

    await story.save();
    res.status(201).json({ success: true, message: "Story created ✅", story });
  } catch (err) {
    console.error("🔥 Create story error:", err);
    res.status(500).json({ success: false, message: "Server error while creating story", error: err.message });
  }
};

export const getFeedStories = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const user = await User.findById(currentUser);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found ❌" });
    }

    const usersToFetch = [...user.following, currentUser];

    const stories = await Story.find({
      user: { $in: usersToFetch },
      expiresAt: { $gt: new Date() }, // active stories only
    })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: stories.length, stories });
  } catch (err) {
    console.error("🔥 Get feed stories error:", err);
    res.status(500).json({ success: false, message: "Server error while fetching stories", error: err.message });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found ❌" });
    }

    if (story.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized ⚠️" });
    }

    await story.deleteOne();
    res.status(200).json({ success: true, message: "Story deleted ✅" });
  } catch (err) {
    console.error("🔥 Delete story error:", err);
    res.status(500).json({ success: false, message: "Server error while deleting story", error: err.message });
  }
};
