import React, { useMemo } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from "react-modal";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { tareasStartUpdate } from '../../actions/tarea';




const initMembers = {
    members: [],
    id:"",
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "$blanco-2",
    },
    overlay: {
      transition: "opacity .2s ease-in-out",
      backgroundColor: "rgba(53, 5, 5, 0.3)",
    },
  };

export const TaskModalUser = (props) => {
  const dispatch = useDispatch();

  const { tareas } = useSelector((state) => state.tareas);
      const { activeTareas } = useSelector((state) => state.tareas);
      const { users } = useSelector(state => state.users)
      let [usersSelect, setUsersSelect] = useState([]);
      let [userNoChat, setUserNoChat] = useState([]);
      const [formMembers, setFormMembers] = useState(initMembers);
      const [searchUser, setSearchUser] = useState("");

      const handlChangeUser = (e) => {
        e.preventDefault();
        setSearchUser(e.target.value);
      };

      useEffect(() => {
        if(activeTareas){
        
        setUserNoChat(
          users.filter((user) => {
            if (!activeTareas.miembros.includes(user.id)) {
              return user;
            }
          })
        );
      
      }
      }, [users,activeTareas,formMembers])

      const filteredUsersAdd = useMemo(
        () =>
          userNoChat.filter((user) => {
    
            return `${user.name} ${user.segundoNombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`
              .toLowerCase()
              .includes(searchUser.toLowerCase());
    
    
          }),
        [userNoChat, usersSelect, searchUser]
      );

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
    formMembers.id=activeTareas.id
    usersSelect.forEach((user) => formMembers.members.push(user.id));
    // await socket.emit("add-member-chat", {
    //   data: formMembers,
    // });

    const formData = new FormData();
    formData.set('members', formMembers.members);
    formData.set('id', activeTareas._id);
    formMembers.members = [];

    formMembers.members = [];
    setUsersSelect([]);
    e.target = null;
    
    dispatch(tareasStartUpdate(formData));

    
 
  }

    /************************************
   * FUNCION BUSCAR/REMOVER USUARIOS *
   ***********************************/
     const handleSelectUser = (user) => {
    
        setUsersSelect([...usersSelect, user]);
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

    return (
    <Modal
      isOpen={props.show}
      onRequestClose={props.close}
      style={customStyles}
      closeTimeoutMS={200}
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
    )
}
