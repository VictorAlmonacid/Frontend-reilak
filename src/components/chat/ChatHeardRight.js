import React, { useEffect, useState } from "react";
import { ChatSearch } from "./ChatSearch";
import { infoChatClosed, infoChatOpen } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Modal from "react-modal";
import { conexionStartLoading } from "../../actions/chat";
import { chatVideoCall } from "./ChatVideoCall";

export const ChatHeardRight = () => {
  const dispatch = useDispatch();

  const [lastConexionChatActivo, setLastConexionChatActivo] = useState("");
  const [llamadaModal, setLlamadaModal] = useState(false);
  
  const hanleOpenStartCall = ()=>{
    window.open("/chatVideoCall", "_blank",",...")
    // setLlamadaModal(true);
    // navigator.getUserMedia(
		// 	{
		// 		video: true,
		// 	},
		// 	(stream) => {
		// 		let video = document.getElementsByClassName('llamada')[0];
		// 		if (video) {
		// 			video.srcObject = stream;
		// 		}
		// 	},
		// 	(err) => console.error(err)
		// );
  }
  const closeModal = ()=>{
    setLlamadaModal(false);
    let video = document.getElementsByClassName('llamada')[0];
		video.srcObject.getTracks()[0].stop();
  }


  const { infoChat } = useSelector((state) => state.infoChat);
  const { chatActivo } = useSelector((state) => state.chat);
  const { conexion } = useSelector((state) => state.chat);
  const { miembros } = useSelector((state) => state.chat);
  const { uid } = useSelector((state) => state.auth);

  const miembrosThisChat = miembros.filter((x) => {
    if (chatActivo.id === x._id) {
      return x.idusuario !== uid;
    }
  });
  useEffect(() => {
    if (miembrosThisChat.lenght > 0) {
      dispatch(conexionStartLoading(miembrosThisChat[0].idusuario));
    }
  }, [miembros]);

  useEffect(() => {
    if (conexion !== null) {
      setLastConexionChatActivo(
        moment(Date.now()).from(conexion.fechatermino, "minutes")
      );
    }
  }, [conexion]);

  const hanleOpenInfoChat = () => {
    if (!infoChat) {
      dispatch(infoChatOpen());
      console.log("se abrio");
    } else {
      dispatch(infoChatClosed());
      console.log("se cerro");
    }
  };

  return (
    <>
      {chatActivo && (
        <div className="chat__right-heard">
          <div className="chat__right-heard-left">
            <div className="chat__right-heard-left-photo">
              <img
                src={
                  chatActivo.img
                    ? chatActivo.img
                    : chatActivo.user
                    ? chatActivo.user[0].imgusuario
                    : chatActivo.imgusuario
                }
              />
            </div>
            <div className="chat__right-heard-left-info">
              {chatActivo.tipo === "personal" ? (
                <div className="chat__right-list-item-info-nombre">
                  {chatActivo.name ? chatActivo.name : chatActivo.user[0].name}{" "}
                  {chatActivo.segundoNombre
                    ? chatActivo.segundoNombre
                    : chatActivo.user[0]
                    ? chatActivo.user[0].segundoNombre
                    : ""}{" "}
                  {chatActivo.segundoNombre
                    ? chatActivo.apellidoPaterno
                    : chatActivo.user[0]
                    ? chatActivo.user[0].apellidoPaterno
                    : ""}{" "}
                  {chatActivo.apellidoMaterno
                    ? chatActivo.apellidoMaterno
                    : chatActivo.user[0]
                    ? chatActivo.user[0].apellidoMaterno
                    : ""}
                </div>
              ) : (
                <div className="chat__right-list-item-info-nombre-nopersonal">
                  {chatActivo.name ? chatActivo.name : chatActivo.user[0].name}{" "}
                  {chatActivo.segundoNombre
                    ? chatActivo.segundoNombre
                    : chatActivo.user[0]
                    ? chatActivo.user[0].segundoNombre
                    : ""}{" "}
                  {chatActivo.segundoNombre
                    ? chatActivo.apellidoPaterno
                    : chatActivo.user[0]
                    ? chatActivo.user[0].apellidoPaterno
                    : ""}{" "}
                  {chatActivo.apellidoMaterno
                    ? chatActivo.apellidoMaterno
                    : chatActivo.user[0]
                    ? chatActivo.user[0].apellidoMaterno
                    : ""}
                </div>
              )}
              {chatActivo.tipo === "personal" && (
                <div className="chat__right-list-item-info-last-conection">
                  {miembrosThisChat[0] && miembrosThisChat[0].online
                    ? "Activo ahora"
                    : conexion && conexion.fechatermino === null
                    ? "Activo hace unos segundo"
                    : conexion
                    ? `Activo hace ${lastConexionChatActivo}`
                    : ""}
                </div>
              )}
            </div>
          </div>
          {chatActivo.user && (
            <div className="chat__right-heard-right">
              {/* <div className="chat__right-heard-right-search">
              <ChatSearch />
            </div> */}
              {/* <div
                className="chat__right-heard-right-icon"
                onClick={hanleOpenStartCall}
              >
                <i class="fas fa-video"></i>
              </div> */}
              <div
                className="chat__right-heard-right-icon"
                onClick={hanleOpenInfoChat}
              >
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
          )}
                     {/* <Modal
                  isOpen={llamadaModal}
                  onRequestClose={closeModal}
                  // className="modal modal-publicacion"
                  // overlayClassName="modal-fondo"
                >
                  <video height="400" width="400" autoPlay className="llamada">
                  
                  </video>
                </Modal> */}
        </div>
      )}
    </>
    //   <AppBar position="static" className={classes.content}>
    //   <Toolbar variant="regular" >
    //     <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    //     <Avatar src="https://honeysanime.com/wp-content/uploads/2017/10/Gintama-Gintoki-crunchyroll-1-560x315.jpg"></Avatar>
    //     </IconButton>
    //     <Typography variant="h6" color="inherit" className={classes.title}>
    //       Sakata Gintoki
    //     </Typography>
    //     <div className={classes.search}>
    //       <div className={classes.searchIcon}>
    //         <SearchIcon />
    //       </div>
    //       <InputBase
    //         placeholder="Search…"
    //         classes={{
    //           root: classes.inputRoot,
    //           input: classes.inputInput,
    //         }}
    //         inputProps={{ 'aria-label': 'search' }}
    //       />
    //     </div>
    //     <IconButton
    //       edge="end"
    //       className={classes.menuButton}
    //       color="inherit"
    //       aria-label="menu"
    //     >
    //       <MoreHorizIcon />
    //     </IconButton>
    //   </Toolbar>
    // </AppBar>
  );
};
