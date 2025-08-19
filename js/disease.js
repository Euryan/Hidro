if (typeof client !== "undefined") {
  client.on("message", (topic, payload) => {
    const data = payload.toString().trim();
    if (topic === "asep/12345678/disease") {
      console.log("Disease detected:", data);
      document.getElementById("disease-text").textContent = data;
    }
  }); //mqtt
}

function detectDisease() {
  const diseaseText = document.getElementById("disease-text");
  diseaseText.textContent = "Scanning for plant diseases...";

  if (typeof client !== "undefined") {
    client.publish("asep/12345678/minta", "minta");
    console.log("Command sent: minta");
  } else {
    console.error("MQTT client not available!");
  }
}
