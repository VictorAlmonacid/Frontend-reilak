import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';

import { uiCloseModal } from '../../actions/ui';
import { eventsClearActiveEvent, eventsStartAddNew, eventsStartUpdate } from '../../actions/eventos';


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

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    titulo: '',
    descripcion: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}


export const CalendarModal = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { events, activeEvents } = useSelector(state => state.events);


    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

    const [formValues, setFormValues] = useState(initEvent);

    const { descripcion, titulo, start, end } = formValues;

    useEffect(() => {
        if (activeEvents) {
            setFormValues(activeEvents);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvents, setFormValues])


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
        dispatch(eventsClearActiveEvent());
        setFormValues(initEvent);
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
            <div className="header-calendarmodal-ysm">
                <div className="titulo-calendarmodal-ysm">
                    {titulo}
                </div>
            </div>
            <div className="subheader-calendarmodal-ysm">
                <div className="fechainicio-subheader-ysm">
                    {moment(start).format("DD-MM-yy")}
                </div>
                <div className="fechafin-subheader-ysm">
                    {moment(end).format("DD-MM-yy")}
                </div>
            </div>
            <div className="body-calendarmodal-ysm">
                {descripcion}
            </div>
            <div className="footer-calendarmodal-ysm">
                <div className="link-footer-ysm">
                    Link
                </div>
            </div>
        </Modal>
    )
}