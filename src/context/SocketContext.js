import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/useSockets";
import { useDispatch, useSelector } from "react-redux";
import { notificacionLoaded } from "../actions/post";
import Peer from 'simple-peer';
import {
  activarChat,
  chatAddNew,
  chatStartLoading,
  chatStartMembers,
  conexionLoaded,
  membersLoaded,
  MessageAddNew,
} from "../actions/chat";
import { scrollToBottomAnimate } from "../helpers/scrollToBottom";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    "http://localhost:4000"
  );
  const { logged } = useSelector((state) => state.auth);
  const { conexion } = useSelector((state) => state.chat);
  const { uid } = useSelector((state) => state.auth);

  /*******  VIDEO CALL  *********** */

  const [stream, setStream] = useState(null);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
const [callAcepted, setCallAcepted] = useState(false);
const [callEnded, setCallEnded] = useState(false);




  useEffect(() => {
    if (logged) {
      conectarSocket();
      console.log("existe uid");
    }
  }, [logged, conectarSocket]);

  useEffect(() => {
    if (!logged) {
      desconectarSocket();

      console.log("no existe uid");
    }
  }, [logged, desconectarSocket]);

  // Escuchar los cambios en los usuarios conectados
  useEffect(() => {
    socket?.on("lista-usuarios-activo", (usuarios) => {
      console.log(usuarios);
      dispatch(membersLoaded(usuarios));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("lista-cambios-usuarios", (usuarios) => {
      console.log("algo cambio");

      socket.emit("lista-usuarios", {
        uid,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("create-sala-chat", (mensaje) => {
      console.log(mensaje);
      dispatch(chatAddNew(mensaje));
      dispatch(chatStartLoading());
      dispatch(activarChat(mensaje));
      dispatch(chatStartMembers(mensaje.id));
    });
  }, [socket]);
useEffect(() => {
socket?.on("reading-last-messge",(message)=>{
  dispatch(chatStartLoading());
})
}, [socket]);
  useEffect(() => {
    socket?.on("send-message", (message) => {
      console.log(message);
      dispatch(MessageAddNew(message));
      dispatch(chatStartLoading());
    });
  }, [socket]);

  // useEffect(() => {

  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       setStream(currentStream);

  //       myVideo.current.srcObject = currentStream;
  //     });

  //   socket?.on('me',(id)=>setMe(id));
  //   socket?.on('videoCall',(data)=>{
  //     setCall(data)
  //   })

  // },[socket]);

  // const answerCall = ()=>{
  //   setCallAcepted(true);

  //   const peer = new Peer({initiator:false, trickle:false,stream});
  //   peer.on('signal', (data)=>{
  //     socket.emit('answerCall',data);

  //   });
  //   peer.on('stream', (currentStream)=>{
  //     userVideo.current.srcObject=currentStream;
  //   });

  //   peer.signal(call.signal);
  //   connectionRef.current = peer;
  // }

  // const videoCall = (id)=>{
  //   const peer = new Peer({initiator:false, trickle:false,stream});
  //   peer.on('signal', (data)=>{
  //     socket.emit('videoCall',data);

  //   });
  //   peer.on('stream', (currentStream)=>{
  //     userVideo.current.srcObject=currentStream;
  //   });

  //   socket.on('callAcepted',(signal)=>{
  //     setCallAcepted(true);
  //     peer.signal(signal);
  //   })

 
  // }

  // const leaveCall = ()=>{
  //   setCallEnded(true);
  //   connectionRef.current.destroy();
  //   window.location.reload();
  // }
  // useEffect(() => {
  // socket?.on("send-activo", (activo)=>{

  // if(conexion!==null){
  //   for(let i=0;i<activo.length;i++){

  //       if(conexion.usuario === activo[i].id){
  //         console.log('es ', activo[i]);

  //       }
  //   }
  // }
  // })

  // }, [socket])

  // useEffect(() => {
  //   socket?.on('notificacion', (notificacion)=>{
  //     console.log('object')
  //     dispatch(notificacionLoaded(notificacion))
  //   })

  // }, [socket])

  return (
    <SocketContext.Provider value={{ socket, online,  }}>
      {children}
    </SocketContext.Provider>
  );
};


// call, callAcepted, myVideo, userVideo, stream, callEnded,me, videoCall,leaveCall, answerCall