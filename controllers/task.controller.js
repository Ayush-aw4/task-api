const Task = require("../models/task.model");

// 🧠 In-memory cache
let cache = {
  data: null,
  timestamp: null,
};

const CACHE_DURATION = 60 * 1000; // 60 sec

// GET ALL TASKS (CACHED)
exports.getTasks = async (req, res) => {
  try {
    // Check cache
    if (
      cache.data &&
      Date.now() - cache.timestamp < CACHE_DURATION
    ) {
      return res.json({
        source: "cache",
        data: cache.data,
      });
    }

    const tasks = await Task.find();

    // Store in cache
    cache.data = tasks;
    cache.timestamp = Date.now();

    res.json({
      source: "db",
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    // ❌ clear cache
    cache.data = null;

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    cache.data = null;

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    cache.data = null;

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};