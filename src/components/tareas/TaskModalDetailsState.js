import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { tareasStartUpdate } from '../../actions/tarea';
import moment from "moment";

const initTask = {
    estado: false
  
  };
export const TaskModalDetailsState = () => {
    const dispatch = useDispatch();
    const { activeTareas } = useSelector((state) => state.tareas);
    const [formValues, setFormValues] = useState(initTask);
    const { uid } = useSelector((state) => state.auth);
    
   

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(activeTareas.estado){
            initTask.estado = false;
            activeTareas.estado = false;
        }else{
            initTask.estado = true;
            activeTareas.estado = true;
        }
       
        const formData = new FormData();
            formData.set('id', activeTareas._id);
            formData.set('estado', formValues.estado);
            dispatch(tareasStartUpdate(formData));
            // dispatch(postClearActiveEvent());
        
      };


    return (
        <form className="task__details-content-state" onSubmit={handleSubmitForm}>
            <span>Estado</span>{" "}
            <span className="task-state-green">{activeTareas.estado?'Completa': !activeTareas.estado && moment(activeTareas.fechaTermino).format("DD-MM-YYYY")<moment(Date.now()).format("DD-MM-YYYY")?'Atrasada':'En proceso'}</span>
            <div className="">
            { activeTareas.usuario === uid?
            <div className="input-button">
              <button type="submit">{activeTareas.estado? 'Marcar como pendiente' : 'Marcar como terminado'}</button>
            </div>
        :
        <div></div>
        }
          </div>
           
          </form>
    )
}
