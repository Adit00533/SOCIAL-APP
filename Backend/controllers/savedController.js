import {
  savePost as savePostService,
  unsavePost as unsavePostService,
  getSavedPosts as getSavedPostsService,
} from "../services/savedService.js";

export const savePost = async (req, res) => {
  try {
    const result = await savePostService(req.user.id, req.params.postId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const unsavePost = async (req, res) => {
  try {
    const result = await unsavePostService(req.user.id, req.params.postId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSavedPosts = async (req, res) => {
  try {
    const posts = await getSavedPostsService(req.user.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
