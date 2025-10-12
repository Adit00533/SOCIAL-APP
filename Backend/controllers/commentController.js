import {
  handleAddComment,
  handleGetCommentsByPost,
  handleUpdateComment,
  handleDeleteComment,
} from "../services/commentService.js";

export const addComment = async (req, res) => {
  try {
    const result = await handleAddComment(req.params.postId, req.user.id || req.user._id, req.body.text);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Add comment error:", err);
    res.status(500).json({ success: false, message: "Server error while adding comment", error: err.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const result = await handleGetCommentsByPost(req.params.postId);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Get comments error:", err);
    res.status(500).json({ success: false, message: "Server error while fetching comments", error: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const result = await handleUpdateComment(req.params.id, req.user.id || req.user._id, req.body.text);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Update comment error:", err);
    res.status(500).json({ success: false, message: "Server error while updating comment", error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const result = await handleDeleteComment(req.params.id, req.user.id || req.user._id);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Delete comment error:", err);
    res.status(500).json({ success: false, message: "Server error while deleting comment", error: err.message });
  }
};
