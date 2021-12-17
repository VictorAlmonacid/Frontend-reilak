import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { postStartUpdated } from "../../actions/post";
import { tareasStartUpdate } from "../../actions/tarea";

const initTask = {
  titulo: "",
  contenido: "",

};

export const TaskModalDetailsForm = () => {

  const dispatch = useDispatch();
  const { activeTareas } = useSelector((state) => state.tareas);
  const { uid } = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState(initTask);
  const [endDate, setEndDate] = useState(new Date());

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    if (activeTareas) {
      setFormValues(activeTareas);
      setEndDate(new Date(activeTareas.fechaTermino));
    } else {
      setFormValues(initTask);
    }
  }, [activeTareas, setFormValues]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('titulo', formValues.titulo);
    formData.set('contenido', formValues.contenido);
    formData.set('fechaTermino' ,endDate);
    console.log(formValues);

        formData.set('id', activeTareas._id);
        
        dispatch(tareasStartUpdate(formData));
        // dispatch(postClearActiveEvent());
      
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="input-box">
        <input type="text" required onChange={handleInputChange} name="titulo" value={formValues.titulo} />
        <label htmlFor="">Titulo</label>
      </div>
      <div className="date-box">
        <DatePicker
          dateFormat="dd-MM-yyyy"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <label htmlFor="">Vencimiento</label>
      </div>
      <div className="textarea-box">
        <textarea required onChange={handleInputChange} name="contenido" value={formValues.contenido}></textarea>
        <label htmlFor="">Decripcion</label>
      </div>
{ activeTareas.usuario === uid?
      <div className="">
            <div className="input-button">
              <button type="submit">Editar</button>
            </div>
          </div>
          :
          <div></div>
          }

    </form>
  );
};
