import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const API_URL = "https://www.velyn.biz.id/api/downloader/facebookdl?url=";

app.get("/download", async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.json({ success: false, message: "No URL provided" });
    }

    try {
        const response = await fetch(API_URL + encodeURIComponent(videoUrl));
        const result = await response.json();
        if (result && result.result && result.result.link) {
            res.json({ success: true, downloadLink: result.result.link });
        } else {
            res.json({ success: false, message: "Download link not found" });
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        res.json({ success: false, message: "API error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
