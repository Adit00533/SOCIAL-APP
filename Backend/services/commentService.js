import Comment from "../models/comments.js";

export const handleAddComment = async (postId, userId, text) => {
  if (!text || text.trim() === "") {
    return {
      status: 400,
      body: { success: false, message: "Comment text is required ❌" },
    };
  }

  const comment = new Comment({
    postId,
    userId,
    text: text.trim(),
  });

  const savedComment = await comment.save();

  return {
    status: 201,
    body: {
      success: true,
      message: "Comment added successfully 💬",
      comment: savedComment,
    },
  };
};

export const handleGetCommentsByPost = async (postId) => {
  const comments = await Comment.find({ postId })
    .populate("userId", "username email")
    .sort({ createdAt: -1 });

  return {
    status: 200,
    body: {
      success: true,
      count: comments.length,
      message: "Comments fetched successfully ✅",
      comments,
    },
  };
};

export const handleUpdateComment = async (commentId, userId, text) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return {
      status: 404,
      body: { success: false, message: "Comment not found ❌" },
    };
  }

  if (comment.userId.toString() !== userId.toString()) {
    return {
      status: 403,
      body: {
        success: false,
        message: "You are not authorized to update this comment ⚠️",
      },
    };
  }

  if (!text || text.trim() === "") {
    return {
      status: 400,
      body: { success: false, message: "Comment text cannot be empty ❌" },
    };
  }

  comment.text = text.trim();
  const updatedComment = await comment.save();

  return {
    status: 200,
    body: {
      success: true,
      message: "Comment updated successfully ✏️",
      comment: updatedComment,
    },
  };
};

export const handleDeleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return {
      status: 404,
      body: { success: false, message: "Comment not found ❌" },
    };
  }

  if (comment.userId.toString() !== userId.toString()) {
    return {
      status: 403,
      body: {
        success: false,
        message: "You are not authorized to delete this comment ⚠️",
      },
    };
  }

  await comment.deleteOne();

  return {
    status: 200,
    body: {
      success: true,
      message: "Comment deleted successfully 🗑️",
    },
  };
};
