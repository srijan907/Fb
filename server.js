const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/download", async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: "Please provide a Facebook video URL" });
    }

    try {
        const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);
        if (response.data.status) {
            return res.json({ videoUrl: response.data.data.url });
        } else {
            return res.status(400).json({ error: "Failed to fetch video" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
