import React, { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

export const ChatVideoCall = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
    

  return (
    <div className="videocall-room">
      <div className="videocall-tolbar">VideoCallBarr</div>
      <div className="videocall-video">
        <div className="myvideo">
          {stream && (<video playsInline muted ref={myVideo} autoPlay />)}
        </div>
        <div className="videouser">
            {callAccepted && !callEnded &&(
          <video playsInline ref={userVideo} autoPlay />
          )}
        </div>
      </div>
      <div>Options</div>
    </div>
  );
};
