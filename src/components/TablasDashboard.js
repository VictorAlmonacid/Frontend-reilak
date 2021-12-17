import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import ReactHTMLTableExcel from 'react-html-table-to-excel'

//CALENDARIO
const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
  start: now.toDate(),
  end: nowPlus1.toDate(),
}


const FiltrosDashboard = () => {
  const [formValues, setFormValues] = useState(initEvent);
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

  const handleBuscar = () => {
    // dispatch(userBuscar(formValues.buscar));
  }

  return (

    <div className="filtros-body-dashboard-ysm">
      <ReactHTMLTableExcel
        id="botonExportarExcel"
        className="btn-exportar-excel"
        table="eventos"
        filename="eventosExcel"
        sheet="Eventos"
        buttonText=""
      />
      <div className="ordenar-body-filtros-dashboard-ysm">
        Fecha inicio:
      </div>
      <div className="selectcont-ordenar-body-filtros-dashboard-ysm">
        <DateTimePicker
          onChange={handleStartDateChange}
          value={dateStart}
        />
      </div>
      <div className="ordenar-body-filtros-dashboard-ysm">
        Fecha fin:
      </div>
      <div className="selectcont-ordenar-body-filtros-dashboard-ysm">
        <DateTimePicker
          onChange={handleEndDateChange}
          value={dateEnd}
          minDate={dateStart}
        />
      </div>
      <button type="submit" onClick={handleBuscar}>Buscar</button>
    </div>

  )
}

export const TablaPublicaciones = () => {


  console.log(useSelector(state => state.calendar));

  return (
    <div className="tablas-container-body-dashboard-ysm">
      <FiltrosDashboard />
      <div className="tablas-body-dashboard-ysm">
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Contenido</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {/* {events.map(({ titulo, id, contenido, fecha }, i) =>
              <tr key={i}>
                <td>{titulo}</td>
                <td></td>
                <td>{moment(fecha).format("DD-MM-YYYY, h:mm a")}</td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const TablaEventos = () => {

  const { events } = useSelector(state => state.events);

  return (
    <div className="tablas-container-body-dashboard-ysm">
      <FiltrosDashboard />
      <div className="tablas-body-dashboard-ysm">
        <table id="eventos">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
            </tr>
          </thead>
          <tbody>
            {events.map(({ titulo, id, descripcion, start, end, tipo }, i) =>
              <tr key={i}>
                <td>{titulo}</td>
                <td>{descripcion}</td>
                <td>{moment(start).format("DD-MM-YYYY, h:mm a")}</td>
                <td>{moment(end).format("DD-MM-YYYY, h:mm a")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const TablaUsuarios = () => {

  const { users } = useSelector(state => state.users);

  return (
    <div className="tablas-container-body-dashboard-ysm">
      <FiltrosDashboard />
      <div className="tablas-body-dashboard-ysm">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Rut</th>
              <th>Nombre</th>
              <th>S. Nombre</th>
              <th>A. Paterno</th>
              <th>A. Materno</th>
              <th>Email</th>
              <th>Email Personal</th>
              <th>Fono</th>
              <th>Área</th>
              <th>Cargo</th>
              <th>Rol</th>
              <th>Nacimiento</th>
              <th>Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ rut, id, name, apellidoPaterno, apellidoMaterno, email, area, cargo, segundoNombre, rol, estado, fono, nacimiento, imgusuario, ingreso, emailp }, i) =>
              <tr key={i}>
                <td><img src={imgusuario} height="30px" width='30px' style={{ borderRadius: '50%' }} /></td>
                <td>{rut}</td>
                <td>{name}</td>
                <td>{segundoNombre}</td>
                <td>{apellidoPaterno}</td>
                <td>{apellidoMaterno}</td>
                <td>{email}</td>
                <td>{emailp}</td>
                <td>{fono}</td>
                <td>{area}</td>
                <td>{cargo}</td>
                <td>{rol}</td>
                <td>{moment(nacimiento).format("DD-MM-YYYY")}</td>
                <td>{moment(ingreso).format("DD-MM-YYYY")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
