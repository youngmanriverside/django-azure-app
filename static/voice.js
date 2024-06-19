if (navigator.mediaDevices) {
    console.log("getUserMedia supported.");
  
    const constraints = { audio: true };
    let chunks = [];
  
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        
        // if button with id start is clicked, start recording
        const record = document.getElementById("start");
        record.onclick = () => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
          record.style.background = "red";
          record.style.color = "black";
        };
        // if button with id stop is clicked, start recording
        const stop = document.getElementById("stop");
        stop.onclick = () => {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
            record.style.background = "";
            record.style.color = "";
        };
  
        mediaRecorder.onstop = (e) => {
          console.log("data available after MediaRecorder.stop() called.");
  
            const clipName = prompt("Enter a name for your sound clip");
    
            const clipContainer = document.createElement("article");
            const clipLabel = document.createElement("p");
            const audio = document.createElement("audio");
            const deleteButton = document.createElement("button");
            const mainContainer = document.querySelector("body");
    
            clipContainer.classList.add("clip");
            audio.setAttribute("controls", "");
            deleteButton.textContent = "Delete";
            clipLabel.textContent = clipName;
    
            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            mainContainer.appendChild(clipContainer);
  
            audio.controls = true;
            const blob = new Blob(chunks, { type: "audio/mp3; codecs=opus" });
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            audio.src = audioURL;
        
            console.log("recorder stopped");
  
            deleteButton.onclick = (e) => {
                const evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
            };
        };
  
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

      })
      .catch((err) => {
        console.error(`The following error occurred: ${err}`);
      });
  }
  