
        // Mobile sidebar toggle
        function toggleMobileSidebar() {
            const sidebar = document.getElementById('mobile-sidebar');
            sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
        }

        function updateSensorData() {
            const temp = (Math.random() * 10 + 20).toFixed(1);
            const humidity = (Math.random() * 30 + 50).toFixed(0);
            const soil = (Math.random() * 40 + 30).toFixed(0);
            
            document.getElementById('temperature-value').textContent = temp + '°C';
            document.getElementById('temp-gauge').textContent = temp + '°';
            
            document.getElementById('humidity-value').textContent = humidity + '%';
            document.getElementById('humidity-gauge').textContent = humidity + '%';
            
            document.getElementById('soil-value').textContent = soil + '%';
            document.getElementById('soil-gauge').textContent = soil + '%';
            
            updateStatus('temp-status', temp, 20, 30, 'Too low', 'Too high', 'Normal');
            updateStatus('humidity-status', humidity, 50, 70, 'Too dry', 'Too humid', 'Optimal');
            updateStatus('soil-status', soil, 40, 60, 'Too dry', 'Too wet', 'Moderate');
            
            const now = new Date();
            document.getElementById('last-updated').textContent = now.toLocaleTimeString();
        }
        
        function updateStatus(elementId, value, min, max, lowText, highText, normalText) {
            const element = document.getElementById(elementId);
            const numValue = parseFloat(value);
            
            if (numValue < min) {
                element.textContent = lowText;
                element.className = 'text-blue-500';
            } else if (numValue > max) {
                element.textContent = highText;
                element.className = 'text-red-500';
            } else {
                element.textContent = normalText;
                element.className = 'text-green-500';
            }
        }
        
        function moveRobot(direction) {
            const statusElement = document.getElementById('robot-status');
            let directionText = '';
            let statusClass = '';
            
            switch(direction) {
                case 'forward':
                    directionText = 'Moving Forward';
                    statusClass = 'text-blue-500';
                    break;
                case 'backward':
                    directionText = 'Moving Backward';
                    statusClass = 'text-blue-500';
                    break;
                case 'left':
                    directionText = 'Turning Left';
                    statusClass = 'text-blue-500';
                    break;
                case 'right':
                    directionText = 'Turning Right';
                    statusClass = 'text-blue-500';
                    break;
                case 'stop':
                    directionText = 'Stopped';
                    statusClass = 'text-red-500';
                    break;
                default:
                    directionText = 'Idle';
                    statusClass = 'text-gray-500';
            }
            
            statusElement.textContent = directionText;
            statusElement.className = statusClass;
            
            console.log('Sending command to robot:', direction);
            
            if (direction !== 'stop') {
                setTimeout(() => {
                    statusElement.textContent = 'Idle';
                    statusElement.className = 'text-gray-500';
                }, 2000);
            }
        }
        
        // Toggle disease details
        function toggleDiseaseDetails(diseaseId) {
            const detailElement = document.getElementById(`disease-detail-${diseaseId}`);
            const cardElement = document.getElementById(`disease-card-${diseaseId}`);
            
            detailElement.classList.toggle('active');
            cardElement.classList.toggle('border-green-400');
        }
        
        // Disease detection function
        // Disease detection function (trigger IoT device via MQTT)
        function detectDisease() {
            const diseaseResults = document.getElementById('disease-results');

            // tampilkan loading spinner
            diseaseResults.innerHTML = `
                <div class="col-span-3 flex flex-col items-center justify-center py-8">
                    <i class="fas fa-spinner fa-spin text-3xl text-green-600 mb-3"></i>
                    <p class="text-gray-700">Scanning for plant diseases...</p>
                </div>
            `;

            // kirim perintah ke device lewat MQTT
            if (typeof client !== "undefined") {
                client.publish("eureka/12345678/cmd", "minta");
                console.log("Command sent: detect");
            } else {
                console.error("MQTT client not available!");
            }
        }

        
        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            updateSensorData();
            
            // Update data every 5 seconds
            setInterval(updateSensorData, 5000);
        });
function updateSpeed(value) {
    // Update text di dashboard
    document.getElementById("speed-value").textContent = value;

    console.log("Speed set to:", value);

    // Publish ke MQTT
    if (typeof client !== "undefined") {
        client.publish("eureka/12345678/speed", value.toString());
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const videoFeed = document.getElementById("camera-feed");
    const placeholder = document.getElementById("camera-placeholder");
    const streamIndicator = document.getElementById("stream-indicator");
    const streamStatus = document.getElementById("stream-status");

    const cameraUrl = "http://10.192.190.161:5000/video_feed";

    streamIndicator.className = "fas fa-circle text-gray-400 mr-1";
    streamStatus.textContent = "Connecting...";

    
    videoFeed.src = cameraUrl;

    videoFeed.onload = () => {
        placeholder.classList.add("hidden");
        videoFeed.classList.remove("hidden");

        streamIndicator.className = "fas fa-circle text-green-500 mr-1";
        streamStatus.textContent = "Streaming";
    };

    videoFeed.onerror = () => {
        placeholder.classList.remove("hidden");
        videoFeed.classList.add("hidden");

        streamIndicator.className = "fas fa-circle text-red-500 mr-1";
        streamStatus.textContent = "Error";
    };

    document.getElementById("fullscreen-btn").addEventListener("click", () => {
        if (videoFeed.requestFullscreen) {
            videoFeed.requestFullscreen();
        } else if (videoFeed.webkitRequestFullscreen) { /* Safari */
            videoFeed.webkitRequestFullscreen();
        } else if (videoFeed.msRequestFullscreen) { /* IE11 */
            videoFeed.msRequestFullscreen();
        }
    });


    document.getElementById("snapshot-btn").addEventListener("click", () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoFeed.width;
        canvas.height = videoFeed.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoFeed, 0, 0, canvas.width, canvas.height);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "snapshot.png";
        link.click();
    });
});
