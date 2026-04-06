const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// GET profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, budget, locationPreference, gender, lookingFor, bio, avatar, preferredGender, showToNonSelectedGender } = req.body;
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Directly assign to avoid evaluating 0 or empty string as false
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (budget !== undefined) user.budget = budget;
    if (locationPreference !== undefined) user.locationPreference = locationPreference;
    if (gender !== undefined) user.gender = gender;
    if (lookingFor !== undefined) user.lookingFor = lookingFor;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    if (preferredGender !== undefined) user.preferredGender = preferredGender;
    if (showToNonSelectedGender !== undefined) user.showToNonSelectedGender = showToNonSelectedGender;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET roommates
router.get("/roommates", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) return res.status(404).json({ message: "User not found" });

    const excludedIds = [currentUser._id, ...(currentUser.matches || []), ...(currentUser.passed || [])];

    // Basic filter
    let query = { 
      _id: { $nin: excludedIds },
      lookingFor: { $in: ["Roommate", "Both"] } 
    };

    // Privacy Logic: Avoid showing users who set showToNonSelectedGender=false and preferredGender != currentUser.gender
    // Meaning we only get users who EITHER:
    // - Show to everyone OR
    // - Have a preferred gender that matches the current user's gender OR
    // - Have a preferred gender of "Any"
    if (currentUser.gender !== "Any") {
      query.$or = [
        { showToNonSelectedGender: true },
        { preferredGender: currentUser.gender },
        { preferredGender: "Any" }
      ];
    }

    if (req.query.location) {
      query.locationPreference = new RegExp(req.query.location, "i");
    }
    
    if (req.query.maxBudget) {
      query.budget = { $lte: Number(req.query.maxBudget) };
    }

    const roommates = await User.find(query).select("-password");
    res.json(roommates);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /match/:id - Log a match explicitly
router.post("/match/:id", auth, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.id;

    if (currentUserId === targetUserId) return res.status(400).json({ message: "Cannot match yourself" });

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) return res.status(404).json({ message: "Target user not found" });

    // Add to current user if not exists
    if (!currentUser.matches.includes(targetUserId)) {
      currentUser.matches.push(targetUserId);
      await currentUser.save();
    }
    
    // Add to target user if not exists (simulate mutual match instantly for this UI flow)
    if (!targetUser.matches.includes(currentUserId)) {
      targetUser.matches.push(currentUserId);
      await targetUser.save();
    }

    res.json({ message: "Matched successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /matches - Retrieve matched users
router.get("/matches/list", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).populate("matches", "name avatar bio locationPreference");
    if (!currentUser) return res.status(404).json({ message: "User not found" });

    res.json(currentUser.matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /pass/:id - Log a passed profile explicitly
router.post("/pass/:id", auth, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.id;

    if (currentUserId === targetUserId) return res.status(400).json({ message: "Cannot pass yourself" });

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) return res.status(404).json({ message: "User not found" });

    if (!currentUser.passed.includes(targetUserId)) {
      currentUser.passed.push(targetUserId);
      await currentUser.save();
    }
    
    res.json({ message: "Passed profile successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
