import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activarChat, chatStartLoading, conexionStartLoading, messageStartLoading } from "../../actions/chat";
import { SocketContext } from "../../context/SocketContext";
import { infoChatClosed, infoChatOpen } from "../../actions/ui";
import { scrollToBottom } from "../../helpers/scrollToBottom";
import moment from "moment";


export const ChatListUsers = () => {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const [searchUser, setSearchUser] = useState("");


  useEffect(() => {
    dispatch(chatStartLoading());

  }, [dispatch]);

  const { chats } = useSelector(state => state.chat);

  const { uid } = useSelector(state => state.auth)
  const handleActivarChat = (id) => {
    dispatch(activarChat(id))
    dispatch(messageStartLoading(id.id));
    for (let i = 0; i < id.members.length; i++) {
      if (id.members[i] !== uid) {
        dispatch(conexionStartLoading(id.members[i]));
        dispatch(infoChatClosed());
      }
    }
    const data = {
      id,
      uid
    }
    socket.emit("read-last-message", {
      data
    });
  }
  /******************************* */
  const handlChangeUser = (e) => {
    e.preventDefault();
    setSearchUser(e.target.value);
  };
  const filteredUsers = useMemo(
    () =>
      chats.filter((chat, i) => {
        if (chat.user.length) {
          for (let i = 0; i < chat.user.length; i++) {
            return `${chat.user[i].name} ${chat.user[i].apellidoPaterno}`
              .toLowerCase()
              .includes(searchUser.toLowerCase());
          }
        } else {
          return `${chat.name}`
            .toLowerCase()
            .includes(searchUser.toLowerCase());
        }
      }),
    [chats, searchUser, dispatch]
  );

  return (
    <>
      <div className="chat__left-search">
        <input type="text" className="chat__left-search-input" placeholder="Buscar" onChange={handlChangeUser} value={searchUser} />
        <button className="chat__left-search-button">
          <i class="fas fa-search search__icon"></i>
        </button>
      </div>
      <div className="chat__left-list">
        {filteredUsers.map((chats, i) => (
          <div className="chat__left-list-item" onClick={() => { handleActivarChat(chats) }}>
            <div className="chat__left-list-item-photo">
              <img src={chats.img ? chats.img : chats.user[0].imgusuario} />
            </div>
            <div className="chat__left-list-item-info">
              <div className="chat__left-list-item-info-nombre">
                {chats.name ? chats.name : chats.user[0].name} {chats.tipo === "personal" && chats.user ? chats.user[0].apellidoPaterno : ''}
             {chats.lastmessage[0]&& !chats.lastmessage[0].viewedby.includes(uid) && <span> <i class="fas fa-bell"></i></span>}
              </div>
              <div className="chat__left-list-item-info-last-message">
                <span className="chat__left-list-item-info-last-message-content">{chats.lastmessage[0]? chats.lastmessage[0].message.substr(-3)==="png" ||chats.lastmessage[0].message.substr(-3)==="jpg"||chats.lastmessage[0].message.substr(-3)==="gif"||chats.lastmessage[0].message.substr(-3)==="jpge"?<i class="fas fa-image"> Imagen</i>:chats.lastmessage[0].message.substr(-3)==="mp4"?<i class="fas fa-video"> Video</i> :chats.lastmessage[0].message:'' }</span><span className="chat__left-list-item-info-last-message-date"> {chats.lastmessage[0]? moment(chats.lastmessage[0].fecha).format("h:mm a DD-MM"):''}</span>
              </div>
            </div>
          </div>
        ))

        }
      </div>
    </>
  );
};
