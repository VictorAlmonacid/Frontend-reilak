
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startCreateComment, startLoadComentarios } from '../../actions/tarea';


const initComentario = {
  comentario: "",
  tarea:"",
  usuario:"",
};

export const CommentTareas = () => {
  const dispatch = useDispatch();
  const {activeTareas} = useSelector(state => state.tareas);
  const {uid} = useSelector(state => state.auth);


  useEffect(() => {
    if(activeTareas){
      dispatch(startLoadComentarios(activeTareas._id));
    }

  }, [activeTareas,dispatch]);


  const [formValuesCommnet, setFormValuesComment] = useState(initComentario);

  const handleInputChangeComment = ({ target }) => {
    setFormValuesComment({
      ...formValuesCommnet,
      [target.name]: target.value,
    });
  };
const handleCreateComment = (e)=>{
  e.preventDefault();
  formValuesCommnet.tarea = activeTareas._id;
  formValuesCommnet.usuario=uid;
  console.log(formValuesCommnet);
  dispatch(startCreateComment(formValuesCommnet));
}


  return (

    <div className="modal__tarea-body-left-comment">
      <div className="modal__tarea-body-left-comment-title">
        <i className="fas fa-comment-alt"></i> Comentarios
      </div>
      <form className="modal__tarea-body-left-comment-input" onSubmit={handleCreateComment}>
        <div className="modal__tarea-body-left-comment-input-img">
          <img src="https://i.pinimg.com/originals/67/14/73/67147337e83e09a9c841af64c9222acb.jpg" />{" "}
        </div>
        <div className="modal__tarea-body-left-comment-input-content">
          <input type="text" name="comentario" onChange={handleInputChangeComment} onKeyPress="submit" />{" "}
        </div>
      </form>
      <div className="modal__tarea-body-left-comment-list">
        <div className="modal__tarea-body-left-comment-list-item">
          <div className="modal__tarea-body-left-comment-list-item-img">
            <img src="https://i.pinimg.com/originals/67/14/73/67147337e83e09a9c841af64c9222acb.jpg" />
          </div>
          <div className="modal__tarea-body-left-comment-list-item-info">
            <div className="modal__tarea-body-left-comment-list-item-info-title">
              cara
            </div>
            <div className="modal__tarea-body-left-comment-list-item-info-content">
              cara de mono no chino
            </div>
            <div className="modal__tarea-body-left-comment-list-item-info-opt">
              {" "}
              <i className="fas fa-trash"></i>{" "}
              <i className="far fa-edit"></i>
            </div>
          </div>
        </div>
        <div className="modal__tarea-body-left-comment-list-item">
          <div className="modal__tarea-body-left-comment-list-item-img">
            <img src="https://i.pinimg.com/originals/67/14/73/67147337e83e09a9c841af64c9222acb.jpg" />
          </div>
          <div className="modal__tarea-body-left-comment-list-item-info">
            <div className="modal__tarea-body-left-comment-list-item-info-title">
              cara
            </div>
            <div className="modal__tarea-body-left-comment-list-item-info-content">
              cara de mono no chino
            </div>
            <div className="modal__tarea-body-left-comment-list-item-info-opt">
              {" "}
              <i className="fas fa-trash"></i>{" "}
              <i className="far fa-edit"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}