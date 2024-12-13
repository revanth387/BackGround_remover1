document.getElementById("removeBtn").addEventListener("click", function () {
    const fileInput = document.getElementById("fileInput");
    const outputImage = document.getElementById("outputImage");
    const downloadBtn = document.getElementById("downloadBtn");
  
    if (fileInput.files.length === 0) {
      alert("Please select an image file.");
      return;
    }
  
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");
  
    // Use your Remove.bg API key here
    const apiKey = "T99gYxeVZgz7bEmoqesueqMm";
  
    fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to remove background. Please check your API key and image.");
        }
        return response.blob();
      })
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        outputImage.src = imageUrl;
        outputImage.style.display = "block";
  
        // Enable and set up the download button
        downloadBtn.style.display = "block";
        downloadBtn.href = imageUrl;
        downloadBtn.download = "no-bg-image.png"; // Set the default download file name
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while removing the background: " + error.message);
      });
  });
  
  // Add event listener for download button
  document.getElementById("downloadBtn").addEventListener("click", function () {
    const downloadLink = document.createElement("a");
    downloadLink.href = document.getElementById("outputImage").src;
    downloadLink.download = "no-bg-image.png";
    downloadLink.click();
  });
  