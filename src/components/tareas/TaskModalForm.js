import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { tareasStartAddNew } from "../../actions/tarea";
import { useSelector } from "react-redux";
export const TaskModalForm = (props) => {
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

  const initTask = {
    titulo: "",
    contenido: "",
  
  };
  const { uid } = useSelector((state) => state.auth);
 const [formValues, setFormValues] = useState(initTask);
  const [endDate, setEndDate] = useState(new Date());

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('titulo', formValues.titulo);
    formData.set('contenido', formValues.contenido);
    formData.set('fechaTermino' ,endDate);
    formData.set('miembros' ,uid)
    

      dispatch(tareasStartAddNew(formData));

  };


  return (
    <Modal
      isOpen={props.show}
      onRequestClose={props.close}
      style={customStyles}
      closeTimeoutMS={200}
    >
      <div className="task__form">
        <form onSubmit={handleSubmitForm}>
          <div className="input-title">
            <h3>Crear tarea</h3>
          </div>
          <div className="input-box" >
            <input type="text" required onChange={handleInputChange} name="titulo" autoComplete="off" />
            <label htmlFor="">Ingrese un titulo</label>
          </div>
          <div className="date-box">
          <DatePicker dateFormat = "dd-MM-yyyy"  selected={endDate} onChange={(date) => setEndDate(date)} />
            <label htmlFor="">Seleccione una fecha</label>
          </div>
          <div className="textarea-box">
            <textarea required onChange={handleInputChange} name="contenido" ></textarea>
            <label htmlFor="">Ingresa una descripcion</label>
          </div>
          <div className="input-button">
            <button type="submit">Subir</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
