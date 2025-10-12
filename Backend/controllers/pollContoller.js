import {
  handleCreatePoll,
  handleVotePoll,
  handleGetPoll,
} from "../services/pollService.js";

export const createPoll = async (req, res) => {
  try {
    const result = await handleCreatePoll(req.user.id, req.params.postId, req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Create poll error:", err);
    res.status(500).json({ error: "Server error during poll creation", details: err.message });
  }
};

export const votePoll = async (req, res) => {
  try {
    const result = await handleVotePoll(req.user.id, req.params.pollId, req.body.optionIndex);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Vote error:", err);
    res.status(500).json({ error: "Server error while voting", details: err.message });
  }
};

export const getPoll = async (req, res) => {
  try {
    const result = await handleGetPoll(req.params.pollId);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Get poll error:", err);
    res.status(500).json({ error: "Server error while fetching poll", details: err.message });
  }
};
