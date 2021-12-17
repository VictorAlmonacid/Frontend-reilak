import React, { useEffect, useState } from "react";
import moment from 'moment';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import { userClearActiveEvent } from '../../actions/usuarios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');

const initEvent = {
    id: '',
    name: '',
    email: '',
    segundoNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    area: '',
    fono: '',
    nacimiento: '',
    rol: '',
    cargo: '',
    rut: '',
    imgusuario: '',
    ingreso: '',
    emailp: '',
    estado: '',
    nacimiento: now.toDate(),
    ingreso: now.toDate(),

    //Modal
    opcion: ''
}

export const ResumenUsuario = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { activeUser } = useSelector(state => state.users);

    const [formValues, setFormValues] = useState(initEvent);

    const { id, name, email, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut, imgusuario, ingreso, emailp, estado, opcion = "Contacto" } = formValues;

    useEffect(() => {
        if (activeUser) {
            setFormValues(activeUser);
        } else {
            setFormValues(initEvent);
        }
    }, [activeUser, setFormValues])

    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
        dispatch(userClearActiveEvent());
        setFormValues(initEvent);
    }

    const handleOpcion = (valor) => {

        if (valor == "Cargo") {
            setFormValues({
                ...formValues,
                opcion: "Cargo"
            });
        }

        if (valor == "Contacto") {
            setFormValues({
                ...formValues,
                opcion: "Contacto"
            });
        }

        if (valor == "Otros") {
            setFormValues({
                ...formValues,
                opcion: "Otros"
            });
        }

    }



    return (
        <Modal
            isOpen={modalOpen}
            //   onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal modal-calendarmodal-ysm"
            overlayClassName="modal-fondo"
        >
            <div className="header-resumenusuario-ysm">
                <div className="titulo-resumenusuario-ysm">
                    Informacion Del Usuario
                </div>
            </div>
            <div className="subheader-resumenusuario-ysm">
                <div className="img-subheader-resumenusuario-ysm">

                </div>
                <div className="info-subheader-resumenusuario-ysm">

                </div>
            </div>
            <div className="body-resumenusuario-ysm">
                {(opcion == "Cargo") ?
                    <div className="para-opcion-ysm">
                        <div className="apartado-resumenusuario-ysm">
                            <div className="subapartado-resumenusuario-ysm">
                                <div className="header-subapartado-resumenusuario-ysm">
                                    Rol
                                </div>
                                <div className="body-subapartado-resumenusuario-ysm">
                                    {rol}
                                </div>
                            </div>
                        </div>
                        <div className="apartado-resumenusuario-ysm">
                            <div className="subapartado-resumenusuario-ysm">
                                <div className="header-subapartado-resumenusuario-ysm">
                                    Área
                                </div>
                                <div className="body-subapartado-resumenusuario-ysm">
                                    {area}
                                </div>
                            </div>
                        </div>
                        <div className="apartado-resumenusuario-ysm">
                            <div className="subapartado-resumenusuario-ysm">
                                <div className="header-subapartado-resumenusuario-ysm">
                                    Cargo
                                </div>
                                <div className="body-subapartado-resumenusuario-ysm">
                                    {cargo}
                                </div>
                            </div>
                        </div>
                    </div>

                    : (opcion == "Contacto") ?
                        <div className="para-opcion-ysm">
                            <div className="apartado-resumenusuario-ysm">
                                <div className="subapartado-resumenusuario-ysm">
                                    <div className="header-subapartado-resumenusuario-ysm">
                                        Email Personal
                                    </div>
                                    <div className="body-subapartado-resumenusuario-ysm">
                                        {emailp}
                                    </div>
                                </div>
                            </div>
                            <div className="apartado-resumenusuario-ysm">
                                <div className="subapartado-resumenusuario-ysm">
                                    <div className="header-subapartado-resumenusuario-ysm">
                                        Email Coorporativo
                                    </div>
                                    <div className="body-subapartado-resumenusuario-ysm">
                                        {email}
                                    </div>
                                </div>
                            </div>
                            <div className="apartado-resumenusuario-ysm">
                                <div className="subapartado-resumenusuario-ysm">
                                    <div className="header-subapartado-resumenusuario-ysm">
                                        Fono
                                    </div>
                                    <div className="body-subapartado-resumenusuario-ysm">
                                        {fono}
                                    </div>
                                </div>
                            </div>
                        </div>
                        : (opcion == "Otros") ?
                            <div className="para-opcion-ysm">
                                <div className="apartado-resumenusuario-ysm">
                                    <div className="subapartado-resumenusuario-ysm">
                                        <div className="header-subapartado-resumenusuario-ysm">
                                            Estado
                                        </div>
                                        <div className="body-subapartado-resumenusuario-ysm">
                                            {estado}
                                        </div>
                                    </div>
                                </div>
                                <div className="apartado-resumenusuario-ysm">
                                    <div className="subapartado-resumenusuario-ysm">
                                        <div className="header-subapartado-resumenusuario-ysm">
                                            Ingreso
                                        </div>
                                        <div className="body-subapartado-resumenusuario-ysm">
                                        {moment(ingreso).format("DD-MM-yy")}
                                        </div>
                                    </div>
                                </div>
                                <div className="apartado-resumenusuario-ysm">
                                    <div className="subapartado-resumenusuario-ysm">
                                        <div className="header-subapartado-resumenusuario-ysm">
                                            Nacimiento
                                        </div>
                                        <div className="body-subapartado-resumenusuario-ysm">
                                        {moment(nacimiento).format("DD-MM-yy")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""
                }
            </div>
            <div className="footer-resumenusuario-ysm">
                <div className="personal-link-footer-ysm" onClick={() => { handleOpcion("Cargo"); }}>
                    <i class="fas fa-briefcase"></i>
                </div>
                <div className="contacto-link-footer-ysm" onClick={() => { handleOpcion("Contacto"); }}>
                    <i class="far fa-address-card"></i>
                </div>
                <div className="otros-link-footer-ysm" onClick={() => { handleOpcion("Otros"); }}>
                    <i class="far fa-plus-square"></i>
                </div>
            </div>
        </Modal>
    )
}
