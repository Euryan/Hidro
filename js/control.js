let controlInterval = null;


function updateRobotStatus(text, colorClass) {
  const statusElement = document.getElementById("robot-status");
  statusElement.textContent = text;
  statusElement.className = colorClass; // langsung ganti warna text
}

function startSendingCommand(direction) {
  if (controlInterval) return; // jangan bikin interval ganda

  controlInterval = setInterval(() => {
    client.publish("eureka/12345678/gerak", direction);
    console.log("Sending:", direction);
  }, 200); // kirim tiap 200ms

  // update status sesuai arah
  switch(direction) {
    case "maju":
      updateRobotStatus("Moving Forward", "text-blue-500");
      break;
    case "mundur":
      updateRobotStatus("Moving Backward", "text-blue-500");
      break;
    case "kiri":
      updateRobotStatus("Turning Left", "text-blue-500");
      break;
    case "kanan":
      updateRobotStatus("Turning Right", "text-blue-500");
      break;
    default:
      updateRobotStatus("Idle", "text-gray-500");
  }
}

function stopSendingCommand() {
  if (controlInterval) {
    clearInterval(controlInterval);
    controlInterval = null;
    client.publish("eureka/12345678/gerak", "stop");
    console.log("Sending: stop");
    updateRobotStatus("Stopped", "text-red-500");
  }
}


// ambil semua tombol
const forwardBtn = document.getElementById("btn-forward");
const backwardBtn = document.getElementById("btn-backward");
const leftBtn = document.getElementById("btn-left");
const rightBtn = document.getElementById("btn-right");
const stopBtn = document.getElementById("btn-stop");

// binding event
function bindControl(btn, direction) {
  btn.addEventListener("mousedown", () => startSendingCommand(direction));
  btn.addEventListener("mouseup", stopSendingCommand);
  btn.addEventListener("mouseleave", stopSendingCommand);
  btn.addEventListener("touchstart", () => startSendingCommand(direction));
  btn.addEventListener("touchend", stopSendingCommand);
}

bindControl(forwardBtn, "maju");
bindControl(backwardBtn, "mundur");
bindControl(leftBtn, "kiri");
bindControl(rightBtn, "kanan");

// tombol stop = langsung kirim stop sekali
stopBtn.addEventListener("click", () => {
  client.publish("eureka/12345678/gerak", "stop");
  document.getElementById("robot-status").textContent = "Stopped";
});
