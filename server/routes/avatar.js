// routes/avatar.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/avatars/:id", async (req, res) => {
  const id = req.params.id;
  const avatarUrl = `https://api.dicebear.com/8.x/identicon/svg?seed=${id}`;

  try {
    const response = await axios.get(avatarUrl);
    const base64 = Buffer.from(response.data).toString("base64");
    res.send(`data:image/svg+xml;base64,${base64}`);
  } catch (err) {
    console.error("⚠️ Avatar fetch failed:", err.message);
    res.status(500).send("Failed to fetch avatar");
  }
});

module.exports = router;
