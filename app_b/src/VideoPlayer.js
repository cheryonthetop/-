import React, { Component } from "react";

export default class VideoPlayer extends Component {
  componentDidMount() {}
  handleVideoUpload = () => {
    var inputNode = document.querySelector("input");
    var file = inputNode.files[0];
    var videoNode = document.querySelector("video");
    var fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
  };
  handleScreenShot = () => {
    // Get handles on the video and canvas elements
    var video = document.querySelector("video");
    var canvas = document.querySelector("canvas");
    // Define some vars required later
    var w = video.videoWidth;
    var h = video.videoHeight;
    canvas.width = w;
    canvas.height = h;
    // Get a handle on the 2d context of the canvas element
    var context = canvas.getContext("2d");
    // Define the size of the rectangle that will be filled (basically the entire element)
    context.fillRect(0, 0, w, h);
    // Grab the image from the video
    context.drawImage(video, 0, 0, w, h);
    const src = canvas.toDataURL();
    const entityData = { src, w, h };
    localStorage.setItem("entityData", JSON.stringify(entityData));
    // Send a message with the text 'Hello Treehouse!' to the new window.
    document
      .getElementById("receiver")
      .contentWindow.postMessage(
        JSON.stringify(entityData),
        "http://localhost:3000"
      );
    console.log(JSON.parse(localStorage.getItem("entityData")));
  };
  render() {
    return (
      <div id="container">
        <video id="video" style={{ width: "80%" }} controls autoPlay></video>
        <div style={{ padding: "10px" }}>
          <input
            type="file"
            accept="video/*"
            onChange={this.handleVideoUpload}
          />
          <button id="capture" onClick={this.handleScreenShot}>
            屏幕截图
          </button>
        </div>
        <canvas style={{ width: "80%" }}> </canvas>
        <iframe
          id="receiver"
          src="http://localhost:3000"
          width="500"
          height="200"
          hidden
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      </div>
    );
  }
}
