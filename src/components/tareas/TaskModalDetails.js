import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { TaskModalDetailsFile } from "./TaskModalDetailsFile";
import { TaskModalDetailsForm } from "./TaskModalDetailsForm";
import { TaskModalDetailsState } from "./TaskModalDetailsState";
import moment from "moment";
import { useDispatch } from "react-redux";
import { userStartLoading } from "../../actions/usuarios";
import { useEffect } from "react";
import { tareasStartDeleteImg } from "../../actions/tarea";
import { TaskModalDetailsComment } from "./TaskModalDetailsComment";
import { TaskModalUser } from "./TaskModalUser";

export const TaskModalDetails = (props) => {
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

  const dispatch = useDispatch();
  const { activeTareas } = useSelector((state) => state.tareas);
  const [showModalUser, setshowModalUser] = useState(false);

  useEffect(() => {
    dispatch(userStartLoading());
  }, [dispatch]);
  const { users } = useSelector((state) => state.users);

  // Eliminar publicacion
  const eliminarImg = (tareaId, fileId) => {
    const data = {
      data: fileId,
    };
    dispatch(tareasStartDeleteImg(tareaId, data));
  };
  const handleOpenTask = () => {
    setshowModalUser(true);
  };
  return (
    <div>
    <Modal
      isOpen={props.show}
      onRequestClose={props.close}
      style={customStyles}
      closeTimeoutMS={200}
    >
      <div className="task__details">
        <div className="task__details-content-left">
          <TaskModalDetailsForm />
          <TaskModalDetailsState />
          <div className="task__details-content-attachment">
            <div className="task__details-content-attachment-title">
              <i class="fas fa-paperclip"></i>Adjuntos
            </div>
            <div>
              <TaskModalDetailsFile />
            </div>
            <div className="task__details-content-attachment-files">
              {activeTareas &&
                activeTareas.multimedia.slice(0).reverse().map((file, i) => (
                  <div className="task__details-content-attachment-files-item">
                    <div className="task__details-content-attachment-files-preview">
                      <img src={file.img} alt="" />
                    </div>
                    <div className="task__details-content-attachment-files-details">
                      <div className="task__details-content-attachment-files-details-name">
                        Subida: {moment(file.fecha).format("HH:mm  DD-MM-YYYY")}
                      </div>

                      <div className="task__details-content-attachment-files-details-name">
                        Subido por{" "}
                        {users.map(
                          (user, i) => user.id === file.usuario && (user.name +' ' + user.segundoNombre +' ' + user.apellidoPaterno +' ' + user.apellidoMaterno)
                        )}
                      </div>

                      <div className="task__details-content-attachment-files-details-opt">
                        <div download="imagen">
                          <a href={file.img} target="_blank">
                            <i class="fas fa-file-download"></i>Visualizar
                          </a>
                        </div>
                        <div
                          className="task-btn-delete-img"
                          onClick={() => {
                            eliminarImg(activeTareas._id, file.id);
                          }}
                        >
                          <i class="fas fa-trash"></i>Eliminar
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="task__details-content-comments">
            <div className="task__details-content-comments-title">
              <i class="fas fa-comment-alt"></i> Comentarios
            </div>
            <div>
              <TaskModalDetailsComment />
            </div>
            <div className="task__details-content-comments-list">
{activeTareas &&
                activeTareas.comentarios.slice(0).reverse().map((comentario, i)=>(
              <div className="task__details-content-comments-list-item">
                <div className="task__details-content-comments-list-item-picture">
                {users.map((user,i)=>(user.id === comentario.usuario && (
                    <img
                    src={user.imgusuario} width="40" height="40" 
                    alt=""
                  />
                    )))}
                </div>
                <div className="task__details-content-comments-list-item-info">
                  <div className="task__details-content-comments-list-item-name">
                    <strong>{users.map(
                          (user, i) => user.id === comentario.usuario && (user.name +' ' + user.segundoNombre +' ' + user.apellidoPaterno +' ' + user.apellidoMaterno)
                        )}</strong> <span>{moment(comentario.fecha).format("HH:mm  DD-MM-YYYY")}</span>
                  </div>
                  <div className="task__details-content-comments-list-item-text">
                    {comentario.comentario}
                  </div>
                </div>
              </div>
))}
            </div>
          </div>
        </div>
        <div className="task__details-members">
          <div className="task__details-members-title">
            <h3>Miembros</h3>
          </div>
          <div className="task__details-members-opts">
            <div className="input-button">
              <button type="submit" onClick={() => {handleOpenTask()}}>Agregar Miembros</button>
            </div>
          </div>

          <div className="task__details-members-list">
          {activeTareas &&
                activeTareas.miembros.map((miembro,i )=>(
            <div className="task__details-members-list-item">
              <div className="task__details-members-list-item-picture">
              {users.map((user,i)=>(user.id === miembro && (
                    <img
                    src={user.imgusuario} width="40" height="40" 
                    alt=""
                  />
                    )))}
                
              </div>
           
              <div className="task__details-members-list-item-info">
              
                <div className="task__details-members-list-item-name">
                  {users.map((user,i)=>(user.id === miembro && user.name +' ' + user.segundoNombre))} <br />
                  {users.map((user,i)=>(user.id === miembro && user.apellidoPaterno +' ' + user.apellidoMaterno))}
                </div>
            
                
              </div>
            </div>
              ))}
          </div>
        </div>
      </div>
      
    </Modal>
    <TaskModalUser show={showModalUser} close={() => setshowModalUser(false)} />
    </div>
  );
};
