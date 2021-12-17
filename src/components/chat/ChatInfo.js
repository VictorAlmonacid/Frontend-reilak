import React, { useContext, useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { activarChat, chatStartMembers, imagesChatStartLoaded, miembrosNOChatStartLoaded, StartRemoveUserChat, videoChatStartLoaded } from "../../actions/chat";
import Modal from "react-modal";
import { SocketContext } from "../../context/SocketContext";
import { userStartLoading } from "../../actions/usuarios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0",
    margin: "0",
    transform: "translate(-50%, -50%)",
    backgroundColor: "$blanco-2",
  },
  overlay: {
    transition: "opacity .2s ease-in-out",
    backgroundColor: "rgba(53, 5, 5, 0.3)",
  },
};

const initMembers = {
  members: [],
  chatId:"",
}

export const ChatInfo = () => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  const [formMembers, setFormMembers] = useState(initMembers);
  const [accordion, setAccordion] = useState(false);
  const [modalGrupo, setmodalGrupo] = useState(false);
  const [modalAdmin, setModalAdmin] = useState(false);
  const [modalImg, setModalImg] = useState(false);
  const [modalVideo, setModalVideo] = useState(false);
  const [modalSearchMembers, setModalSearchMembers] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [modalSearchNewMembers, setModalSearchNewMembers] = useState(false);
  let [usersSelect, setUsersSelect] = useState([]);
  let [usersList, setUserList] = useState([]);
  let [userNoChat, setUserNoChat] = useState([]);

  const [visible, setVisible] = useState(6);

  const handleShowMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };
  const handlehideMoreItems = () => {
    setVisible(6);
  };


  const { chatActivo } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(chatStartMembers(chatActivo.id));

  }, [modalSearchMembers]);

  useEffect(() => {
    dispatch(imagesChatStartLoaded(chatActivo.id))
  }, [modalImg]);

  useEffect(() => {
    dispatch(videoChatStartLoaded(chatActivo.id))
  }, [modalVideo]);

  // useEffect(() => {
  //   dispatch(miembrosNOChatStartLoaded(chatActivo.id))
  // }, [modalSearchNewMembers]);

  const { messagevideo } = useSelector(state => state.chat);
  const { messageimg } = useSelector(state => state.chat);
  const { miembros } = useSelector((state) => state.chat);
  const { memberView } = useSelector(state => state.chat);
  const { users } = useSelector(state => state.users)
  const { chats } = useSelector(state => state.chat)

  // const { miembrosNOChat } = useSelector(state => state.chat);

  const { uid } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const chatAdd = chats.filter((x)=>{
      return x.id===chatActivo.id;
    })
    
    setUserNoChat(
      users.filter((user) => {
        if (!chatAdd[0].members.includes(user.id)) {
          return user;
        }
      })
    );
    
  }, [users, dispatch,modalSearchNewMembers,chatActivo,formMembers])
  const handleEditChat = (chatActivo) => {
    setmodalGrupo(true);
  };
  const closeModal = (e) => {
    setmodalGrupo(false);
  };
  const closeModalAdmin = (e) => {
    setModalAdmin(false);
  };
  const handleOpenModalAdmins = () => {
    setModalAdmin(true);
  };
  const handleOpenModalChatImages = () => {
    setModalImg(true);
  };
  const handleOpenModalChatVideo = () => {
    setModalVideo(true)
  }
  const handleOpenModalMembers = () => {
    setModalSearchMembers(true)
  }
  const handleOpenModalNewMembers = () => {
    setModalSearchNewMembers(true)
  }
  const closeModalImg = (e) => {
    setModalImg(false);
    setModalVideo(false);
    setModalSearchMembers(false);
    setModalSearchNewMembers(false)
    setUsersSelect([]);

  };
  useEffect(() => {
    const userAqui = chats.filter((x)=>{
      return x.id===chatActivo.id;
    })
    setUserList(
      users.filter((user) => {
        return userAqui[0].members.includes(user.id);
      })
    );
  }, [users, dispatch, modalSearchMembers,chatActivo,formMembers]);
  /************************************
 * FUNCION FILTRAR/BUCAR USUARIOS *
 ***********************************/
  const handlChangeUser = (e) => {
    e.preventDefault();
    setSearchUser(e.target.value);
  };
  const filteredUsers = useMemo(
    () =>
      usersList.filter((user) => {
        if (user.id !== uid) {
          return `${user.name} ${user.segundoNombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`
            .toLowerCase()
            .includes(searchUser.toLowerCase());
        }

      }),
    [usersList, usersSelect, searchUser,]
  );

  const filteredUsersAdd = useMemo(
    () =>
      userNoChat.filter((user) => {

        return `${user.name} ${user.segundoNombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`
          .toLowerCase()
          .includes(searchUser.toLowerCase());


      }),
    [userNoChat, usersSelect, searchUser]
  );

  /************************************
   * FUNCION BUSCAR/REMOVER USUARIOS *
   ***********************************/
  const handleSelectUser = (user) => {
    
    setUsersSelect([...usersSelect, user]);
    console.log(user);
    for (let i = 0; i < userNoChat.length; i++) {
    
      if (userNoChat[i].id === user.id) {

        userNoChat.splice(i, 1);
      }
    }
  };
  /***************************************/
  const handleRemoveUser = (i, user) => {
    setUserNoChat([...userNoChat, user]);
    usersSelect.splice(i, 1);
    console.log(i, '+', user);
  };

  /****************************
   * EXPULSAR USUARIO DE CHAT
   ***************************/
  const handleRemoveUserChat = (user) => {
    console.log(usersList);
    console.log(userNoChat)
    for(let i=0;i<usersList.length;i++){
      if(usersList[i].id===user.id){
        console.log(usersList[i]);
        usersList.splice(i, 1);
      }
    }
    console.log(user)
    const data={
      idChat:chatActivo.id,
      user:user.id,
    }
    dispatch(StartRemoveUserChat(data));
  }
  const handleAddUserChat = (user) => {
    console.log(user)
    // dispatch(StartAddUserChat(user));
  }
  /*******************************
   * Añadir nuevos miembros
   ******************************/
  const handleAddNewMembers = async (e) => {
    e.preventDefault();
    for(let i=0;i< userNoChat.length;i++){
      if(userNoChat[i].id===usersSelect.id){
      
        userNoChat.splice(i, 1);
      }
    }
    formMembers.members = [];
    formMembers.chatId=chatActivo.id
    usersSelect.forEach((user) => formMembers.members.push(user.id));
    await socket.emit("add-member-chat", {
      data: formMembers,
    });
  
    formMembers.members = [];
    closeModalImg();
    e.target = null;
  }

  return (
    <div className="chat__info">
      {
        <div className="chat__info-heard">
          <div className="chat__info-heard-photo">
            <img src={chatActivo.img ? chatActivo.img : chatActivo.user ? chatActivo.user[0].imgusuario : chatActivo.imgusuario} />
          </div>
          <div className="chat__info-heard-info">
            {chatActivo.name}{" "}
            {chatActivo.user !== [] ? chatActivo.admin.includes(uid) &&
              <i
                class="fas fa-pencil-alt"
                onClick={() => {
                  handleEditChat(chatActivo);
                }}
              ></i>
              : ''
            }


          </div>
          <div className="chat__info-heard-info">
            <span>
              {chatActivo.tipo === 'grupo' ? 'Grupo creado' : chatActivo.tipo === 'canal' ? 'Canal creado' : 'Conversacion iniciada'} el {moment(chatActivo.fecha).format("DD-MM-YYYY")}
            </span>
          </div>
          {chatActivo.tipo === "canal" &&
            <div className="chat__info-heard-info-description">
              <div className="chat__info-heard-info-description-icon">
                <i class="fas fa-info-circle"></i>
              </div>
              <div className="chat__info-heard-info-description-data">
                {chatActivo.descripcion}
              </div>
            </div>
          }
        </div>
      }
      <div className="chat__info-body">
        <div className="chat__info-body-multimedias">
          <div
            className="chat__info-body-multimedias-btn"
            onClick={() => {
              handleOpenModalChatImages(chatActivo);
            }}
          >
            <i class="fas fa-images"></i>
            <span>Imagenes</span>
          </div>
          <div className="chat__info-body-multimedias-btn" onClick={() => {
            handleOpenModalChatVideo(chatActivo);
          }}>
            <i class="fas fa-video"></i>
            <span>Videos</span>
          </div>

          <Modal
            isOpen={modalGrupo}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={1}
          // className="modal modal-publicacion"
          // overlayClassName="modal-fondo"
          >
            <div className="updatechat__modal">
              <div className="updatechat__modal-picture">
                <img src={chatActivo.img} />
                <div className="chat__info-heard-photo-update">
                  <i class="fas fa-camera"></i>
                </div>
              </div>
              <div className="updatechat__modal-data-update">
                <div className="updatechat__modal-form">
                  <input
                    className="updatechat__modal-form-input"
                    type="text"
                    placeholder=" "
                    value={chatActivo.name}
                  />
                  <label for="" class="for__modal-form-input">
                    Nombre
                  </label>
                </div>
                <div className="updatechat__modal-form">
                  <input
                    className="updatechat__modal-form-input"
                    type="text"
                    placeholder=" "
                    value={chatActivo.descripcion}
                  />
                  <label for="" class="for__modal-form-input">
                    Descripcion
                  </label>
                </div>
                <div className="updatechat__modal-info-update-type">
                  <div className="updatechat__modal-info-update-type-left">
                    Tipo
                  </div>
                  <div className="updatechat__modal-info-update-type-right">
                    {chatActivo.privacidad === "privado" ? (
                      <select>
                        <option value="privado">{chatActivo.privacidad}</option>
                        <option value="publico">Publico</option>
                      </select>
                    ) : (
                      <select>
                        <option value="publico">{chatActivo.privacidad}</option>
                        <option value="privado">Privado</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
              <div className="updatechat__modal-info-update-members">
                <div
                  className="updatechat__modal-info-update-members-admins"
                  onClick={() => {
                    handleOpenModalAdmins(chatActivo);
                  }}
                >
                  <i class="fas fa-shield-virus"></i>
                  <span>Administradores</span>
                </div>
                <div
                  className="updatechat__modal-info-update-members-admins"
                  onClick={() => {
                    handleOpenModalAdmins(chatActivo);
                  }}
                >
                  <i class="fas fa-user-friends"></i>
                  <span>Usuarios</span>
                </div>
              </div>
              <div className="updatechat__modal-btn">
                <button
                  className="updatechat__modal-btn-opt"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button className="updatechat__modal-btn-opt">Guardar</button>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={modalAdmin}
            onRequestClose={closeModalAdmin}
            style={customStyles}
            closeTimeoutMS={1}
          >
            <div className="modal__users-admin">
              <div className="modal__users-admin-header">
                <div className="modal__users-admin-header-title">
                  Administradores
                </div>
                <div className="modal__users-admin-header-search">
                  <i class="fas fa-search"></i>
                  <input type="text" />
                </div>
              </div>
              <div className="modal__users-admin-body">list-item</div>
              <div className="modal__users-admin-btn">
                <button
                  className="modal__users-admin-btn-opt"
                  onClick={closeModalAdmin}
                >
                  Listo
                </button>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={modalImg}
            onRequestClose={closeModalImg}
            style={customStyles}
            closeTimeoutMS={1}
          >
            <div className="modal__chat-images">
              <div className="modal__chat-images-heard">
                <div className="modal__chat-images-heard-title">
                  Imagenes
                </div>
              </div>
              <div className="modal__chat-images-body">
                <div className="modal__chat-images-body-list">
                  {messageimg.map((messageimg, i) => (
                    <div className="modal__chat-images-body-list-item">
                      <img src={messageimg.message} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={modalVideo}
            onRequestClose={closeModalImg}
            style={customStyles}
            closeTimeoutMS={1}
          >
            <div className="modal__chat-images">
              <div className="modal__chat-images-heard">
                <div className="modal__chat-images-heard-title">
                  Videos
                </div>
              </div>
              <div className="modal__chat-images-body">
                <div className="modal__chat-images-body-list">
                  {messagevideo.map((messagevideo, i) => (
                    <div className="modal__chat-images-body-list-item">
                      <ReactPlayer
                        url={messagevideo.message}
                        width="100%"
                        height="100%"
                        controls={true}
                        pip={true}
                        volume="0.8"
                      // light="true"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={modalSearchMembers}
            onRequestClose={closeModalImg}
            style={customStyles}
            closeTimeoutMS={1}
          >
            <div className="modal__chat-members">
              <div className="modal__chat-members-heard">
                <div className="modal__chat-members-heard-title">
                  Participantes
                </div>
              </div>
              <div className="modal__chat-images-body">
                <dvi className="modal__chat-members-body-search">
                  <input
                    // style={{ textTransform: "lowercase" }}
                    type="text"
                    placeholder="Buscar"
                    onChange={handlChangeUser}
                    value={searchUser}
                  />
                </dvi>
                <div className="modal__chat-images-body-list">
                  {filteredUsers.map((memberView) => (
                    !chatActivo.admin.includes(memberView.idusuario) &&
                    <div className="modal__chat-members-body-list-item" >
                      <div className="modal__chat-members-body-list-item-left">
                        <img src={memberView.imgusuario} />
                      </div>
                      <div className="modal__chat-members-body-list-item-center">
                        <div className="modal__chat-members-body-list-item-center-name">
                          {memberView.name} {memberView.segundoNombre} <br /> {memberView.apellidoPaterno} {memberView.apellidoMaterno}
                        </div>
                      </div>
                      {chatActivo.admin.includes(uid) &&
                      <div className="modal__chat-members-body-list-item-right">
                        {/* <span className="modal__chat-members-body-list-item-right-opt" style={{ color: 'Dodgerblue' }}>
                          <i class="fas fa-user-shield"></i>
                        </span> */}
                        <span className="modal__chat-members-body-list-item-right-opt" style={{ color: 'red' }} onClick={() => { handleRemoveUserChat(memberView) }}>
                          <i class="fas fa-user-times"></i>
                        </span>
                      </div>
                  }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={modalSearchNewMembers}
            onRequestClose={closeModalImg}
            style={customStyles}
            closeTimeoutMS={1}
          >
            <form className="modal__chat-members-add" onSubmit={handleAddNewMembers}>
              <div className="modal__chat-members-heard">
                <div className="modal__chat-members-heard-title">
                  Añadir miembros
                </div>

              </div>
              <div className="modal__chat-members-body">
                <div className="chat__userlected">
                  {usersSelect.map((usersSelect, i) => (
                    <div

                      key={i}
                      className="chat__userlected-item"
                      onClick={() => {
                        handleRemoveUser(i, usersSelect);
                      }}
                    >
                      <img src={usersSelect.imgusuario} />
                      <div>{usersSelect.name} {i}</div>
                    </div>
                  ))}
                </div>
                <dvi className="modal__chat-members-body-search">
                  <input
                    // style={{ textTransform: "lowercase" }}
                    type="text"
                    placeholder="Buscar"
                    onChange={handlChangeUser}
                    value={searchUser}
                  />
                </dvi>
                <div className="modal__chat-members-body-list">
                  {filteredUsersAdd.map((memberView) => (

                    <div className="modal__chat-members-body-list-item" onClick={() => {
                      handleSelectUser(memberView);
                    }}>
                      <div className="modal__chat-members-body-list-item-left">
                        <img src={memberView.imgusuario} />
                      </div>
                      <div className="modal__chat-members-body-list-item-center">
                        <div className="modal__chat-members-body-list-item-center-name">
                          {memberView.name} {memberView.segundoNombre} <br /> {memberView.apellidoPaterno} {memberView.apellidoMaterno}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal__chat-members-bottom">
                <div className="modal__chat-members-bottom-btn">
                  <button>Cancelar</button>

                </div>
                <div className="modal__chat-members-bottom-btn">
                  <button type="submit">Añadir</button>
                </div>
              </div>
            </form>
          </Modal>

        </div>
        {(chatActivo.tipo !== "personal") &&
          <div className="chat__info-body-users">
            <div className="chat__info-body-users-title">
              <div className="chat__info-body-users-title-left">
                <i class="fas fa-user-friends"></i> {chatActivo.members.length} Participantes
              </div>
              <div className="chat__info-body-users-title-right">
                <i class="fas fa-search" onClick={() => { handleOpenModalMembers(chatActivo) }}></i>
                {chatActivo.admin.includes(uid) &&
                  <i class="fas fa-user-plus" onClick={() => { handleOpenModalNewMembers(chatActivo) }}></i>
                }


              </div>
            </div>
            <div className="chat__info-body-users-list">
              {memberView.slice(0, visible).map((miembros, i) => (

                <div className="chat__info-body-users-list-item">
                  <div className="chat__info-body-users-list-item-photo">
                    <img src={miembros.imgusuario} />
                    {miembros.online === true && (
                      <span className="chat__info-body-users-list-item-photo-online"></span>
                    )}
                  </div>
                  <div className="chat__info-body-users-list-item-info">
                    <div className="chat__info-body-users-list-item-info-nombre">
                      {miembros.name} {miembros.segundoNombre} <br />
                      {miembros.apellidoPaterno} {miembros.apellidoMaterno}
                    </div>
                    {miembros.admin.includes(miembros.idusuario) && (
                      <span>Administrador</span>
                    )}
                  </div>
                </div>

              ))}
              {memberView.length >= 7 &&
                (memberView.length <= visible ? (
                  <div className="btn__show-more" onClick={handlehideMoreItems}>
                    Ocultar datos
                  </div>
                ) : (
                  <div className="btn__show-more" onClick={handleShowMoreItems}>
                    Mostrar mas...
                  </div>
                ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
};
