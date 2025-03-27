function downloadVideo() {
    let url = document.getElementById("videoUrl").value;
    let apiURL = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(url)}`;
    
    document.getElementById("status").innerText = "Processing...";
    
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.result && data.result.videoUrl) {
                let downloadLink = document.createElement("a");
                downloadLink.href = data.result.videoUrl;
                downloadLink.download = "Facebook Video.mp4";
                downloadLink.innerText = "Click here to Download";
                downloadLink.style.color = "yellow";
                
                document.getElementById("status").innerHTML = "";
                document.getElementById("status").appendChild(downloadLink);
            } else {
                document.getElementById("status").innerText = "Error: Video not found!";
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById("status").innerText = "Error fetching video!";
        });
}
