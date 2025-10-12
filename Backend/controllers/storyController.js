import {
  createStory as createStoryService,
  getFeedStories as getFeedStoriesService,
  deleteStory as deleteStoryService,
} from "../services/storyService.js";

export const createStory = async (req, res) => {
  try {
    const story = await createStoryService(req.user.id, req.body);
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFeedStories = async (req, res) => {
  try {
    const stories = await getFeedStoriesService(req.user.id);
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStory = async (req, res) => {
  try {
    await deleteStoryService(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
