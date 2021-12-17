import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
//DATE
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
//MODAL
import Modal from 'react-modal';
import { uiOpenModal, uiCloseModal } from '../../actions/ui';
//ALERTAS
import Swal from 'sweetalert2';
//Screens
//ACTIONS
import {
    eventsStartUpdate,
    eventsStartAddNew,
    eventsClearActiveEvent,
} from "../../actions/eventos";
import { userStartLoading } from "../../actions/usuarios";

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#242526",
    },
    overlay: {
      transition: "opacity .2s ease-in-out",
      backgroundColor: "rgba(53, 5, 5, 0.3)",
    },
  };

//CALENDARIO
const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    titulo: '',
    descripcion: '',
    tipo: '',
    usuariosevent: [],
    start: now.toDate(),
    end: nowPlus1.toDate(),
    stepActual: 1,
    eleccion: '',
    radio: 'Presencial',
    link: ''
}

export const CRUDEventos = () => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initEvent);
    const { uid } = useSelector(state => state.auth);
    const { modalOpen } = useSelector(state => state.ui);
    const { users } = useSelector(state => state.users);
    const { events, activeEvents } = useSelector(state => state.events);
    const [titleValid, setTitleValid] = useState(true);
    useEffect(() => {
        dispatch(userStartLoading());
    }, [dispatch])
    const [usersSelect, setUsersSelect] = useState([]);
    const [usersList, setUserList] = useState([]);
    useEffect(() => {
        setUserList(
            users.filter((user) => {
                return user.id !== uid;
            })
        );
    }, []);



    //STEPPER
    const {
        //Stepper
        stepActual = 1,
        eleccion,
        titulo,
        descripcion,
        start,
        end,
        tipo ,
        usuariosevent,
        radio,
        link
    } = formValues;

    useEffect(() => {
        if (activeEvents) {
            setFormValues({
                stepActual: 2,
                eleccion: 'Evento'
            });
            setFormValues(activeEvents);

        } else {
            setFormValues(initEvent);

        }
    }, [events, setFormValues])

    //HANDLES

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }
        if (formValues.titulo == "") {
            return Swal.fire('Error', 'El titulo es obligatorio', 'error');
        }
        if (formValues.descripcion == "") {
            return Swal.fire('Error', 'La descripcion es obligatoria', 'error');
        }
        formValues.usuariosevent = [];
        const formData = new FormData();
        formData.set('titulo', formValues.titulo);
        formData.set('descripcion', formValues.descripcion);
        formData.set('start', formValues.start);
        formData.set('end', formValues.end);
        formData.set('tipo', formValues.tipo);
        console.log("userSelect",usersSelect);
        usersSelect.forEach((user) => console.log(user.id));
        usersSelect.forEach((user) => formValues.usuariosevent.push(user.id));
        formData.set('reunion', formValues.usuariosevent);
        formData.set('link', formValues.link);
        console.log(formValues.usuariosevent);
        if (activeEvents) {
            console.log(activeEvents.id);
            formData.set('id', activeEvents.id);
            dispatch(eventsStartUpdate(formData))
            dispatch(uiCloseModal());
        } else {

            dispatch(eventsStartAddNew(formData));
            dispatch(uiCloseModal());
        }
        setTitleValid(true);
    }

    const handleUsuariosEvento = (id) => {
        function checkAdult(age) {
            return age == id;
        }
        const resultado = usuariosevent.find(checkAdult);
        console.log(resultado);
        function checkAdulti(ages) {
            return ages == id;
        }
        const resultadoindex = usuariosevent.findIndex(checkAdulti);
        if (resultado === id) {
            usuariosevent.splice(resultadoindex, 1);
        } else {
            usuariosevent.push(id);
            console.log(usuariosevent);
            setFormValues({
                ...formValues,
                usuariosevent: usuariosevent
            });
        }

    };


    const handleInputChange = ({ target }) => {
        console.log("llegue aqui");
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleRadio = ({ target }) => {

        console.log(target.value);
        setFormValues({
            ...formValues,
            radio: target.name
        });
    }

    const handleStepperEleccion = (valor) => {
        if (valor == "Evento") {
            setFormValues({
                ...formValues,
                tipo: valor,
                stepActual: stepActual + 1,
                eleccion: valor
            });
        } else if (valor == "Reunion") {
            setFormValues({
                ...formValues,
                tipo: valor,
                stepActual: stepActual + 1,
                eleccion: valor
            });
        }
    }

    const handleIntegrantesReunion = () => {
        dispatch(uiOpenModal());
    }

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSelectUser = (
        i,
        id,
        name,
        segundoNombre,
        apellidoPaterno,
        apellidoMaterno,
        imgusuario
    ) => {
        setUsersSelect([
            ...usersSelect,
            {
                id: id,
                name: name,
                segundoNombre: segundoNombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                imgusuario: imgusuario,
            },
        ]);
        console.log(usersSelect);
        console.log(users);
        usersList.splice(i, 1);
    };

    const handleRemoveUser = (
        i,
        id,
        name,
        segundoNombre,
        apellidoPaterno,
        apellidoMaterno,
        imgusuario
    ) => {
        setUserList([
            ...usersList,
            {
                id: id,
                name: name,
                segundoNombre: segundoNombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                imgusuario: imgusuario,
            },
        ]);
        usersSelect.splice(i, 1);
    };

    //MODAL
    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
    }

    //VOLVER
    const handleVolver = () => {

        dispatch(eventsClearActiveEvent());

    }

    return (
        <div className="contenedor-crud-eventos-ysm">
            {(stepActual == 1 && eleccion == "") ?
                <form className="form-eventos" onSubmit={handleSubmitForm}>
                    <div className="header-crud-eventos-ysm">

                        <div className="titulo-crud-eventos-ysm">Eleccion</div>
                    </div>
                    <div className="body-crud-eventos-ysm">

                        <div class="espacios-body-eventos-ysm">

                        </div>
                        <div class="contenedor-card-eleccion-ysm">
                            <div class="card card1-eleccion-ysm">
                                <div class="titulo-eleccion-ysm">
                                    <b>Evento</b>
                                </div>
                                <div class="icono-eleccion-ysm">
                                    <i class="fas fa-arrow-right fa-2x flecha-derecha-icono" onClick={() => { handleStepperEleccion("Evento"); }} />
                                </div>
                            </div>
                            <div class="card card2-eleccion-ysm">
                                <div class="titulo-eleccion-ysm">
                                    <b>Reunión</b>
                                </div>
                                <div class="icono-eleccion-ysm">
                                    <i class="fas fa-arrow-right fa-2x flecha-derecha-icono" onClick={() => { handleStepperEleccion("Reunion"); }} />
                                </div>
                            </div>
                        </div>
                        <div class="espacios-body-eventos-ysm">

                        </div>
                    </div>
                </form>
                :
                (stepActual == 2 && eleccion == "Evento" || activeEvents != null && activeEvents.tipo == "Evento") ?
                    <form className="form-eventos" onSubmit={handleSubmitForm}>
                        <div className="header-crud-eventos-ysm">
                            <Link to="/eventos">
                                <div className="volver-crud-eventos-ysm" onClick={handleVolver}>
                                    <i class="fas fa-arrow-left fa-2x"></i>
                                </div>
                            </Link>
                            <div className="titulo-crud-eventos-ysm">{(activeEvents) ? 'Editar evento' : 'Nuevo evento'}</div>
                        </div>
                        <div className="body-crud-eventos-ysm">
                            <div className="input-contenedor-eventos-ysm">
                                <input className="input-eventos-ysm" type="text" name="titulo" value={titulo} onChange={handleInputChange} placeholder="Ingrese un título..."></input>
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <input className="input-eventos-ysm" type="text" name="descripcion" value={descripcion} onChange={handleInputChange} placeholder="Ingrese una descripción..."></input>
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <DateTimePicker
                                    onChange={handleStartDateChange}
                                    value={dateStart}
                                    className="input-eventos-ysm"
                                />
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <DateTimePicker
                                    onChange={handleEndDateChange}
                                    value={dateEnd}
                                    minDate={dateStart}
                                    className="input-eventos-ysm"
                                />
                            </div>
                            <div className="input-contenedor-eventos-ysm">
                                <button class="button button2">{(activeEvents) ? 'Editar evento' : 'Nuevo evento'}</button>
                            </div>
                        </div>
                    </form>
                    :
                    (stepActual == 2 && eleccion == "Reunion" || activeEvents != null && tipo == "Reunion") ?
                        <form className="form-eventos" onSubmit={handleSubmitForm}>
                            <div className="header-crud-eventos-ysm">
                                <Link to="/eventos">
                                    <div className="volver-crud-eventos-ysm" onClick={handleVolver}>
                                        <i class="fas fa-arrow-left fa-2x"></i>
                                    </div>
                                </Link>
                                <div className="titulo-crud-eventos-ysm">{(activeEvents) ? 'Editar reunión' : 'Nueva reunión'}</div>
                            </div>
                            <div className="body-crud-eventos-ysm">
                                <div className="input-contenedor-eventos-ysm">
                                    <input className="input-eventos-ysm" type="text" name="titulo" value={titulo} onChange={handleInputChange} placeholder="Ingrese un título..."></input>
                                </div>
                                <div className="input-contenedor-eventos-ysm">
                                    <input className="input-eventos-ysm" type="text" name="descripcion" value={descripcion} onChange={handleInputChange} placeholder="Ingrese una descripción..."></input>
                                </div>
                                <div className="input-contenedor-eventos-ysm">
                                    <DateTimePicker
                                        onChange={handleStartDateChange}
                                        value={dateStart}
                                        className="input-eventos-ysm"
                                    />
                                </div>
                                <div className="input-contenedor-eventos-ysm">
                                    <DateTimePicker
                                        onChange={handleEndDateChange}
                                        value={dateEnd}
                                        minDate={dateStart}
                                        className="input-eventos-ysm "
                                    />
                                </div>
                                {/* <div className="input-contenedor-eventos-ysm">
                                    <div className="online-eventos-ysm">
                                        <div className="radio-eventos-ysm" onChange={handleRadio}>
                                            <input type="radio" value="Presencial" name="tipolink" checked={radio === "Presencial"} /> Presencial
                                            <input type="radio" value="Online" name="tipolink" checked={radio === "Presencial"} /> Online
                                        </div>
                                    </div>
                                    
                                </div> */}
                                {/* <div className="input-contenedor-eventos-ysm">
                                {(radio == "Presencial")
                                        ?
                                        <div class="online-eventos-ysm">
                                            <input className="input-eventos-ysm radio-eventos-ysm input-link-eventos-ysm" type="text" name="link" value={link} onChange={handleInputChange} placeholder="Ingrese una ubicación..."></input>
                                        </div>
                                        : (radio == "Online") ?
                                            <div class="online-eventos-ysm">
                                                <input type="url" id="homepage" name="link" value={link} className="input-eventos-ysm radio-eventos-ysm input-link-eventos-ysm" onChange={handleInputChange} name="homepage"></input>
                                            </div>
                                            :
                                            ""
                                    }
                                </div> */}
                                <div className="inputreunion-contenedor-eventos-ysm">
                                    <div class="button button2" onClick={() => { handleIntegrantesReunion(); }}>{(activeEvents) ? 'Continuar' : 'Nueva reunión'}</div>
                                </div>

                            </div>
                            <Modal
                  isOpen={modalOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  closeTimeoutMS={1}
                // className="modal modal-publicacion"
                // overlayClassName="modal-fondo"
                >
                  <form
                    className="createcanal__modal"
                    onSubmit={handleSubmitForm}
                  >
                    <div className="createcanal__modal-header">
                      Añadir miembros
                    </div>
                    <div className="createcanal__modal-body">
                      <div className="chat__userlected">
                        {usersSelect.map(
                          (
                            {
                              name,
                              segundoNombre,
                              apellidoPaterno,
                              apellidoMaterno,
                              imgusuario,
                              id,
                            },
                            i
                          ) => (
                            <div
                              key={i}
                              className="chat__userlected-item"
                              onClick={() => {
                                handleRemoveUser(
                                  i,
                                  id,
                                  name,
                                  segundoNombre,
                                  apellidoPaterno,
                                  apellidoMaterno,
                                  imgusuario
                                );
                              }}
                            >
                              <img src={imgusuario} />
                              <div>{name}</div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="createcanal__modal-body-search">
                        <input type="text" placeholder="Buscar" />
                      </div>
                      <div className="createcanal__modal-body-users">
                        {usersList.map(
                          (
                            {
                              name,
                              segundoNombre,
                              apellidoPaterno,
                              apellidoMaterno,
                              imgusuario,
                              id,
                            },
                            i
                          ) => (
                            <div
                              key={i}
                              className="contenedor__iniciar-chat-body-item"
                              onClick={() => {
                                handleSelectUser(
                                  i,
                                  id,
                                  name,
                                  segundoNombre,
                                  apellidoPaterno,
                                  apellidoMaterno,
                                  imgusuario
                                );
                              }}
                            >
                              <div className="contenedor__iniciar-chat-body-item-left">
                                <img src={imgusuario} />
                              </div>
                              <div className="contenedor__iniciar-chat-body-item-right">
                                {name} {segundoNombre} <br />
                                {apellidoPaterno} {apellidoMaterno}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="creategrupo__modal-footer">
                      <button
                        className="birthday__modal-btn"
                        type="button"
                        onClick = {closeModal}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="birthday__modal-btn">
                        Crear
                      </button>
                    </div>
                  </form>
                </Modal>
                        </form>
                        :
                        ""
            }
        </div>
    )
}
