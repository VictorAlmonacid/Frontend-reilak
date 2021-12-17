import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tareasStartUpdate } from '../../actions/tarea';


const initTask = {
    comentario: ""
  
  };

export const TaskModalDetailsComment = () => {


    const dispatch = useDispatch();
    const { activeTareas } = useSelector((state) => state.tareas);
    const [formValues, setFormValues] = useState(initTask);
    const [message, setMessage] = useState("");


    const handleInputChange = ({ target }) => {
        setFormValues({
          ...formValues,
          [target.name]: target.value,
        });
      };
    const handleSubmitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('id', activeTareas._id);
        formData.set('comentario', formValues.comentario);

        dispatch(tareasStartUpdate(formData));
        // dispatch(postClearActiveEvent());
        e.target.reset();
    };



    return (
        <form onSubmit={handleSubmitForm}>
        <div className="input-box">
          <input type="text" required onChange={handleInputChange} id='comment-tarea' name="comentario" autoComplete="off" />
          <label htmlFor="">Escriba un comentario</label>
        </div>
        </form>
    )
}
