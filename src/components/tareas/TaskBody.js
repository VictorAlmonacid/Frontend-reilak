import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { tareasSetActive, tareasStartLoading } from '../../actions/tarea';
import { TaskModalDetails } from './TaskModalDetails'
import moment from "moment";

export const TaskBody = () => {

    const [showModal, setshowModal] = useState(false);

    const { tareas } = useSelector((state) => state.tareas);
    const { users } = useSelector((state) => state.users);
    const { uid } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(tareasStartLoading());
    }, [dispatch]);

    const handleOpenTask = (tarea) => {
        dispatch(tareasSetActive(tarea));
        setshowModal(true);
      };

    return (
        <div className="task__body">
            {tareas.length > 0 ?
                tareas.map((tarea, i) => (
                    <div className="task__body-card" onClick={() => {handleOpenTask(tarea)}}>
                        <div className="task__body-card-title">
                            <h5>{tarea.titulo}</h5>
                        </div>
                        <div className="task__body-card-details">
                            <div className="task__body-card-details-state">
                                {tarea.estado?<strong className='color-text-green'>Completada</strong>: !tarea.estado && moment(tarea.fechaTermino).format("DD-MM-YYYY")<moment(Date.now()).format("DD-MM-YYYY")?<strong className='color-text-orange'>Atrasada</strong>:<strong className='color-text-blue'>En proceso</strong>}
                            </div>
                            <div className="task__body-card-details-date">
                           Termino: {moment(tarea.fechaTermino).format("DD-MM-YYYY")}
                            </div>
                        </div>
                        <div className="task__body-card-description">
                            {tarea.contenido}
                        </div>
                        <div className="task__body-card-views">
                            <div className="task__body-card-views-opt">
                                <i class="fas fa-comment"></i> {tarea.comentarios? tarea.comentarios.length: '0'}
                            </div>
                            <div className="task__body-card-views-opt">
                                <i class="fas fa-paperclip"></i>  {tarea.multimedia? tarea.multimedia.length: '0'}
                            </div>
                        </div>
                        <div>
                            Propietario: {users.map((user,i)=>(user.id === tarea.usuario && (user.id=== uid ?' Tu' : user.name +' ' + user.apellidoPaterno)))}
                        </div>
                    </div>))
                :
                <div className="no-publicaciones">No existen Tareas</div>
            }
            <TaskModalDetails show={showModal} close={() => setshowModal(false)} />
        </div>
    )
}
