import {
  createPost as createPostService,
  getAllPosts as getAllPostsService,
  getFeedPosts as getFeedPostsService,
  updatePost as updatePostService,
  deletePost as deletePostService,
  toggleLikePost as toggleLikePostService,
  getUserPosts as getUserPostsService,
  getSinglePost as getSinglePostService,
} from "../services/postservice.js";

export const createPost = async (req, res) => {
  try {
    const post = await createPostService(req.body, req.user.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await getFeedPostsService(req.user.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await updatePostService(req.params.id, req.body, req.user.id);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    await deletePostService(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleLikePost = async (req, res) => {
  try {
    const post = await toggleLikePostService(req.params.id, req.user.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await getUserPostsService(req.params.userId);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await getSinglePostService(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
