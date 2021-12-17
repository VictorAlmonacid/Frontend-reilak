import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TaskModalForm } from "./TaskModalForm";

export const TaskHeader = () => {

  const [showModal, setshowModal] = useState(false);
  const { tareas } = useSelector((state) => state.tareas);
  const [completada, setCompletada] = useState('');
  const [enProceso, setEnProceso] = useState('');
  const [atrasada, setAtrasada] = useState('');

useEffect(() => {

  setCompletada(tareas.filter(e=>
    e.estado === true
  ));
  setEnProceso(tareas.filter(e=>
    e.estado === false
  ));
  // setAtrasada(tareas.filter(e=>
  //   e.estado === false && e.fecha>Date.now()
    
  // ));
}, [tareas])

  return (
    <div className="task__header">
      <div className="task__header-left">
        <div className="task__header-title">
          <h4>Tablero de tareas</h4>
        </div>
        <div className="task__header-opt">
          <button className="task__header-opt-add" onClick={() => setshowModal(true)}>
            <i class="fas fa-plus"></i> Crear
          </button>
          <div></div>
        </div>
      </div>
      <div className="task__header-right">
        <div className="task__header-info">
          <div className="task__header-info-item">Completados {completada.length}</div>
          <div className="task__header-info-item">En proceso {enProceso.length}</div>
          {/* <div className="task__header-info-item">Atrasadas {atrasada.length}</div> */}
        </div>
      </div>
      <TaskModalForm show={showModal} close={() => setshowModal(false)} />
    </div>
  );
};
