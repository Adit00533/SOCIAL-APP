import Poll from "../models/Poll.js";
import Post from "../models/Post.js";

export const handleCreatePoll = async (userId, postId, { question, options, expiresAt }) => {
  if (!question || !options || options.length < 2) {
    return {
      status: 400,
      body: { error: "Question and at least 2 options required" },
    };
  }

  const post = await Post.findById(postId);
  if (!post) {
    return {
      status: 404,
      body: { error: "Post not found" },
    };
  }

  if (post.userId.toString() !== userId) {
    return {
      status: 403,
      body: { error: "Not authorized to create poll for this post" },
    };
  }

  const poll = new Poll({
    post: postId,
    question,
    options: options.map((text) => ({ text })),
    expiresAt: expiresAt ? new Date(expiresAt) : null,
  });

  await poll.save();

  return {
    status: 201,
    body: {
      success: true,
      message: "Poll created",
      poll,
    },
  };
};

export const handleVotePoll = async (userId, pollId, optionIndex) => {
  const poll = await Poll.findById(pollId);
  if (!poll) {
    return {
      status: 404,
      body: { error: "Poll not found" },
    };
  }

  if (poll.expiresAt && poll.expiresAt < new Date()) {
    return {
      status: 400,
      body: { error: "Poll has expired" },
    };
  }

  // Remove previous vote
  poll.options.forEach((opt) => {
    opt.votes = opt.votes.filter((id) => id.toString() !== userId);
  });

  // Add new vote
  if (!poll.options[optionIndex]) {
    return {
      status: 400,
      body: { error: "Invalid option index" },
    };
  }

  poll.options[optionIndex].votes.push(userId);
  await poll.save();

  return {
    status: 200,
    body: {
      success: true,
      message: "Vote recorded",
      poll,
    },
  };
};

export const handleGetPoll = async (pollId) => {
  const poll = await Poll.findById(pollId).populate("options.votes", "username email");
  if (!poll) {
    return {
      status: 404,
      body: { error: "Poll not found" },
    };
  }

  return {
    status: 200,
    body: { success: true, poll },
  };
};
