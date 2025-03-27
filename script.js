document.getElementById("downloadBtn").addEventListener("click", function () {
    let videoUrl = document.getElementById("videoUrl").value;
    if (!videoUrl) {
        alert("Please enter a Facebook video URL.");
        return;
    }

    fetch(`/download?url=${encodeURIComponent(videoUrl)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.downloadLink;
            } else {
                alert("Failed to fetch video. Please try again.");
            }
        })
        .catch(error => console.error("Error:", error));
});

document.getElementById("contactBtn").addEventListener("click", function () {
    window.location.href = "https://wa.me/919874188403"; // তোমার WhatsApp লিংক বসাও
});
