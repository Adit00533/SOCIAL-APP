import axios from "axios";

// Base URL of your backend
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// ✅ Attach token automatically (if exists)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

/* ---------------- AUTH ---------------- */
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);

/* ---------------- USER ---------------- */
export const getUser = (id) => API.get(`/users/${id}`);
export const followUser = (id) => API.put(`/users/${id}/follow`);
export const unfollowUser = (id) => API.put(`/users/${id}/unfollow`);

/* ---------------- POSTS ---------------- */
export const createPost = (formData) => API.post("/posts", formData);
export const getAllPosts = () => API.get("/posts");
export const getUserPosts = (id) => API.get(`/posts/user/${id}`);
export const likePost = (id) => API.put(`/posts/${id}/like`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

/* ---------------- COMMENTS ---------------- */
export const addComment = (postId, text) =>
  API.post(`/posts/${postId}/comments`, { text });
export const deleteComment = (postId, commentId) =>
  API.delete(`/posts/${postId}/comments/${commentId}`);

/* ---------------- FEED ---------------- */
export const getFeed = () => API.get("/posts/feed");
