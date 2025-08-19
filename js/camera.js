const cameraFeed = document.getElementById("camera-feed");
const placeholder = document.getElementById("camera-placeholder");

let errorCount = 0;
const MAX_ERRORS = 5; 
const RESET_INTERVAL = 5000; //biar ga jedak jeduk

cameraFeed.onload = () => {
  console.log("Stream loaded");
  errorCount = 0; // reset error
  cameraFeed.classList.remove("hidden");
  placeholder.classList.add("hidden");
};

// Kalau stream error
cameraFeed.onerror = () => {
  console.warn("Stream error detected");
  errorCount++;

  if (errorCount >= MAX_ERRORS) {
    console.error("Stream gagal terlalu sering, tampilkan placeholder");
    placeholder.classList.remove("hidden");
    cameraFeed.classList.add("hidden");
  }
};


setInterval(() => {
  errorCount = 0;
}, RESET_INTERVAL);
