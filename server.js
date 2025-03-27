const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors()); // CORS issue fix

// API Route
app.get("/download", async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: "No URL provided" });

    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(videoUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status && data.data.url) {
            res.json({ success: true, videoUrl: data.data.url });
        } else {
            res.status(404).json({ error: "Video not found!" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch video" });
    }
});

// Server Run
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
