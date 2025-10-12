import {
  getUserById as getUserByIdService,
  followUser as followUserService,
  unfollowUser as unfollowUserService,
} from "../services/userService.js";

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const result = await followUserService(req.user.id, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const result = await unfollowUserService(req.user.id, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
