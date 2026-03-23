const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// GET all unique conversations
router.get("/conversations", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.user.id }, { receiverId: req.user.id }]
    }).sort({ timestamp: -1 }); // Newest first

    const userIds = new Set();
    const latestMessages = {};

    messages.forEach(msg => {
      const otherId = msg.senderId.toString() === req.user.id ? msg.receiverId.toString() : msg.senderId.toString();
      if (!userIds.has(otherId)) {
        userIds.add(otherId);
        latestMessages[otherId] = msg.text;
      }
    });

    const users = await User.find({ _id: { $in: Array.from(userIds) } }).select("name avatar");
    
    // Attach latest message snippet
    const conversations = users.map(user => ({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      latestMessage: latestMessages[user._id.toString()]
    }));

    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET messages between logged-in user and another user
router.get("/:otherUserId", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.otherUserId },
        { senderId: req.params.otherUserId, receiverId: req.user.id }
      ]
    }).sort({ timestamp: 1 }); // Oldest first

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST message
router.post("/:otherUserId", auth, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: "Message text is required" });
    }

    const newMessage = new Message({
      senderId: req.user.id,
      receiverId: req.params.otherUserId,
      text
    });

    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
