import React from "react";

function VideoSession() {
  return (
    <div>
      <iframe src='http://localhost:9000' style={{ width: "100%", height: "80vh", border: "none" }} title='Therapy Session'></iframe>
    </div>
  );
}

export default VideoSession;
