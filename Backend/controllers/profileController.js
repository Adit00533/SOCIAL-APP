import {
  getMyProfile as getMyProfileService,
  updateMyProfile as updateMyProfileService,
  searchUsers as searchUsersService,
  searchPosts as searchPostsService,
  followUser as followUserService,
  unfollowUser as unfollowUserService,
  getSuggestedUsers as getSuggestedUsersService,
} from "../services/profileService.js";

export const getMyProfile = async (req, res) => {
  try {
    const profile = await getMyProfileService(req.user.id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const updatedProfile = await updateMyProfileService(req.user.id, req.body);
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const users = await searchUsersService(req.query);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const posts = await searchPostsService(req.query);
    res.status(200).json(posts);
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

export const getSuggestedUsers = async (req, res) => {
  try {
    const users = await getSuggestedUsersService(req.user.id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
