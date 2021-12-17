import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { dashboardRadioConexiones, dashboardEOTW, dashboardPOTW, dashboardUsersCount, dashboardUsersOnline } from "../../actions/dashboard";
import { Bar, Pie } from 'react-chartjs-2';
import moment from "moment";
import { TablaEventos, TablaPublicaciones, TablasDashboard, TablaUsuarios } from "./TablasDashboard";
import { TablaRadioCinco, TablaRadioCuatro, TablaRadioDos, TablaRadioSeis, TablaRadioTres, TablaRadioUno } from "./TablasRadios";
import {
  dashboardRadioConexiones,
  dashboardRadioCantidadRol,
  dashboardRadioCantidadArea,
  dashboardRadioCantidadCargo,
  dashboardRadioCantidadEdad,
} from "../../actions/dashboardRadios";
import {
  dashboardCantidadUsuario
} from "../../actions/dashboard";

const initEvent = {
  //Opciones
  opcionTablas: 'Publicaciones',
  opcionDashboard: 'Tablas',
  tabla: ''
}

export const DashboardScreen = () => {
  //DISPATCH
  const dispatch = useDispatch();
  // USEEFFECT
  useEffect(() => {

    dispatch(
      dashboardRadioCantidadRol(),
    );
    dispatch(dashboardRadioConexiones());
    dispatch(dashboardRadioCantidadArea());
    dispatch(dashboardRadioCantidadCargo());
    dispatch(dashboardRadioCantidadEdad());
    dispatch(dashboardCantidadUsuario());
  }, [dispatch])

  const [formValues, setFormValues] = useState(initEvent);
  //USESELECTOR
  const {
    gcantidadedad,
    gcantidadeventos,
    gcantidadpublicaciones,
    gconexionesmensuales,
    gconexionessemanales,
    rcantidadarea,
    rcantidadcargo,
    rcantidadedad,
    rcantidadrol,
    rconexionessemanales,
    dashboardloaded
  } = useSelector(state => state.dashboard);
  console.log(useSelector(state => state.dashboard));
  console.log(gcantidadedad,
    gcantidadeventos,
    gcantidadpublicaciones,
    gconexionesmensuales,
    gconexionessemanales,
    rcantidadarea,
    rcantidadcargo,
    rcantidadedad,
    rcantidadrol,
    rconexionessemanales,
    dashboardloaded);
  console.log("CantidadPorEdad", rcantidadedad);
  //FORMVALUES
  const { opcionTablas, opcionDashboard, tabla } = formValues;

  useEffect(() => {

    setFormValues(initEvent);

  }, [setFormValues])

  var date = moment();
  const hoy = moment(date).format("DD-MM-YYYY")
  const date2 = moment(date).subtract(1, 'days');
  const date3 = moment(date).subtract(2, 'days');
  const date4 = moment(date).subtract(3, 'days');
  const date5 = moment(date).subtract(4, 'days');
  const date6 = moment(date).subtract(5, 'days');
  const date7 = moment(date).subtract(6, 'days');
  const hoy2 = moment(date2).format("DD-MM-YYYY")
  const hoy3 = moment(date3).format("DD-MM-YYYY")
  const hoy4 = moment(date4).format("DD-MM-YYYY")
  const hoy5 = moment(date5).format("DD-MM-YYYY")
  const hoy6 = moment(date6).format("DD-MM-YYYY")
  const hoy7 = moment(date7).format("DD-MM-YYYY")

  const OpcionDashboard = (valor) => {

    if (valor == "Tablas") {
      setFormValues({
        ...formValues,
        opcionDashboard: "Tablas"
      });
    }

    if (valor == "Radios") {
      setFormValues({
        ...formValues,
        opcionDashboard: "Radios"
      });
    }

    if (valor == "Valores") {
      setFormValues({
        ...formValues,
        opcionDashboard: "Valores"
      });
    }

    if (valor == "Graficos") {
      setFormValues({
        ...formValues,
        opcionDashboard: "Graficos"
      });
    }

  }

  const OpcionTablas = (valor) => {

    if (valor == "Publicaciones") {
      setFormValues({
        ...formValues,
        opcionTablas: "Publicaciones"
      });
    }

    if (valor == "Eventos") {
      setFormValues({
        ...formValues,
        opcionTablas: "Eventos"
      });
    }

    if (valor == "Usuarios") {
      setFormValues({
        ...formValues,
        opcionTablas: "Usuarios"
      });
    }

  }

  const VerTabla = (valor) => {

    setFormValues({
      ...formValues,
      opcionDashboard: "Tablas",
      opcionTablas: "TablaRadioUno"
    });

  }

  return (
    <div className="main__home">
      {/* <div className="dashboard__content">
        <DashboardHeard />
        <DashboardReports />
        <div className="dashboard__content-resume">
        <DashboardPostsResume />
        <DashboardEventsResume />   
        </div>
      </div> */}
      <div className="background-dashboard-ysm">
        <div className="header-dashboard-ysm">
          {(opcionDashboard == "Tablas") ?
            <div className="tablas-header-dashboard-ysm tablas-seleccionado-opt-tablas-dashboard-ysm " onClick={() => { OpcionDashboard("Tablas"); }}>
              <i class="fas fa-table"></i>
            </div>
            :
            <div className="tablas-header-dashboard-ysm" onClick={() => { OpcionDashboard("Tablas"); }}>
              <i class="fas fa-table"></i>
            </div>
          }
          {(opcionDashboard == "Radios") ?
            <div className="graficos-header-dashboard-ysm seleccionado-opt-tablas-dashboard-ysm" onClick={() => { OpcionDashboard("Radios"); }}>
              <i class="fas fa-chart-pie"></i>
            </div>
            :
            <div className="graficos-header-dashboard-ysm" onClick={() => { OpcionDashboard("Radios"); }}>
              <i class="fas fa-chart-pie"></i>
            </div>
          }
          {(opcionDashboard == "Valores") ?
            <div className="opt3-header-dashboard-ysm seleccionado-opt-tablas-dashboard-ysm" onClick={() => { OpcionDashboard("Valores"); }}>
              <i class="fas fa-sort-numeric-up-alt"></i>
            </div>
            :
            <div className="opt3-header-dashboard-ysm" onClick={() => { OpcionDashboard("Valores"); }}>
              <i class="fas fa-sort-numeric-up-alt"></i>
            </div>
          }
          {(opcionDashboard == "Graficos") ?
            <div className="opt4-header-dashboard-ysm graficos-seleccionado-opt-tablas-dashboard-ysm" onClick={() => { OpcionDashboard("Graficos"); }}>
              <i class="fas fa-chart-line"></i>
            </div>
            :
            <div className="opt4-header-dashboard-ysm" onClick={() => { OpcionDashboard("Graficos"); }}>
              <i class="fas fa-chart-line"></i>
            </div>
          }
        </div>
        {(opcionDashboard == "Tablas") ?
          <div className="body-dashboard-ysm">
            <div className="header-body-dashboard-ysm">
              <div className="contpublicaciones-header-body-dashboard-ysm">
                {(opcionTablas == "Publicaciones") ?
                  <div className="publicaciones-header-body-dashboard-ysm seleccionado-opt-tablas-dashboard-ysm" onClick={() => { OpcionTablas("Publicaciones"); }}>
                    Publicaciones
                  </div>
                  :
                  <div className="publicaciones-header-body-dashboard-ysm" onClick={() => { OpcionTablas("Publicaciones"); }}>
                    Publicaciones
                  </div>
                }
              </div>
              <div className="conteventos-header-body-dashboard-ysm">
                {(opcionTablas == "Eventos") ?
                  <div className="eventos-header-body-dashboard-ysm seleccionado-opt-tablas-dashboard-ysm" onClick={() => { OpcionTablas("Eventos"); }}>
                    Eventos
                  </div>
                  :
                  <div className="eventos-header-body-dashboard-ysm" onClick={() => { OpcionTablas("Eventos"); }}>
                    Eventos
                  </div>
                }
              </div>
              <div className="contusuarios-header-body-dashboard-ysm">
                {(opcionTablas == "Usuarios") ?
                  <div className="usuarios-header-body-dashboard-ysm seleccionado-opt-tablas-dashboard-ysm" onClick={() => { OpcionTablas("Usuarios"); }}>
                    Usuarios
                  </div>
                  :
                  <div className="usuarios-header-body-dashboard-ysm" onClick={() => { OpcionTablas("Usuarios"); }}>
                    Usuarios
                  </div>
                }
              </div>
            </div>

            {(opcionTablas == "Publicaciones") ?
              <TablaPublicaciones />
              : (opcionTablas == "Eventos") ?
                <TablaEventos />
                : (opcionTablas == "Usuarios") ?
                  <TablaUsuarios />
                  : (opcionTablas == "TablaRadioUno") ?
                    <TablaRadioUno />
                    : (opcionTablas == "TablaRadioDos") ?
                      <TablaRadioDos />
                      : (opcionTablas == "TablaRadioTres") ?
                        <TablaRadioTres />
                        : (opcionTablas == "TablaRadioCuatro") ?
                          <TablaRadioCuatro />
                          : (opcionTablas == "TablaRadioCinco") ?
                            <TablaRadioCinco />
                            : (opcionTablas == "TablaRadioSeis") ?
                              <TablaRadioSeis />
                              :
                              ""
            }
          </div>

          : (opcionDashboard == "Radios") ?
            <div className="body-dashboard-ysm">
              <div className="radios-body-dashboard-ysm">
                <div className="primeralinea-radios-body-dashboard-ysm">
                  <div className="enlinea-body-dashboard-ysm">
                    <div className="conttitulo-enlinea-body-dashboard-ysm">
                      <div className="titulo-enlinea-body-dashboard-ysm">
                        Conexiones
                      </div>
                      <div className="ver-enlinea-body-dashboard-ysm">
                        <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                      </div>
                    </div>
                    <div className="subtitulo-enlinea-body-dashboard-ysm">
                      Semanal
                    </div>
                    <div className="grafico-enlinea-body-dashboard-ysm">
                      <Pie
                        data={{
                          labels: ['Conectados', 'Desconectados'],
                          datasets: [{
                            label: 'Conexiones',
                            data: [rconexionessemanales.length, dashboardloaded - rconexionessemanales.length],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                            ],
                          }]

                        }}
                        options={{
                          layout: {
                            padding: 8,

                          },
                          responsive: true,
                          maintainAspectRatio: false,
                        }}



                      />
                    </div>
                  </div>
                  <div className="enlineasemana-body-dashboard-ysm">
                    <div className="conttitulo-enlinea-body-dashboard-ysm">
                      <div className="titulo-enlinea-body-dashboard-ysm">
                        Cantidad de usuarios
                      </div>
                      <div className="ver-enlinea-body-dashboard-ysm">
                        <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                      </div>
                    </div>
                    <div className="subtitulo-enlinea-body-dashboard-ysm">
                      Por edad
                    </div>
                    <div className="grafico-enlinea-body-dashboard-ysm">
                      <Pie
                        data={{
                          labels: ['Conectados de la semana', 'Desconectados de la semana'],
                          datasets: [{
                            label: 'Conexiones',
                            data: rcantidadedad.map(({ _id, conexiones }, i) =>
                              [
                                conexiones
                              ]
                            ),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                            ],
                          }]

                        }}
                        options={{
                          layout: {
                            padding: 8,

                          },
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                  <div className="enlineasemana-body-dashboard-ysm">
                    <div className="conttitulo-enlinea-body-dashboard-ysm">
                      <div className="titulo-enlinea-body-dashboard-ysm">
                        Cantidad de Usuarios
                      </div>
                      <div className="ver-enlinea-body-dashboard-ysm">
                        <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                      </div>
                    </div>
                    <div className="subtitulo-enlinea-body-dashboard-ysm">
                      Por área
                    </div>
                    <div className="grafico-enlinea-body-dashboard-ysm">
                      <Pie
                        data={{
                          labels: ['Conectados de la semana', 'Desconectados de la semana'],
                          datasets: [{
                            label: 'Conexiones',
                            data: rcantidadarea.map(({ _id, conexiones }, i) =>
                              [
                                conexiones
                              ]
                            ),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                            ],
                          }]

                        }}
                        options={{
                          layout: {
                            padding: 8,

                          },
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="segundalinea-radios-body-dashboard-ysm">
                  <div className="enlinea-body-dashboard-ysm">
                    <div className="conttitulo-enlinea-body-dashboard-ysm">
                      <div className="titulo-enlinea-body-dashboard-ysm">
                        Cantidad de Usuarios
                      </div>
                      <div className="ver-enlinea-body-dashboard-ysm">
                        <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                      </div>
                    </div>
                    <div className="subtitulo-enlinea-body-dashboard-ysm">
                      Por cargo
                    </div>
                    <div className="grafico-enlinea-body-dashboard-ysm">
                      <Pie
                        data={{
                          labels: ['Conectados de la semana', 'Desconectados de la semana'],
                          datasets: [{
                            label: 'Conexiones',
                            data: rcantidadcargo.map(({ _id, conexiones }, i) =>
                              [
                                conexiones
                              ]
                            ),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                            ],
                          }]

                        }}
                        options={{
                          layout: {
                            padding: 8,

                          },
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                  <div className="enlineasemana-body-dashboard-ysm">
                    <div className="conttitulo-enlinea-body-dashboard-ysm">
                      <div className="titulo-enlinea-body-dashboard-ysm">
                        Cantidad de Usuarios
                      </div>
                      <div className="ver-enlinea-body-dashboard-ysm">
                        <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                      </div>
                    </div>
                    <div className="subtitulo-enlinea-body-dashboard-ysm">
                      Por rol
                    </div>
                    <div className="grafico-enlinea-body-dashboard-ysm">
                      <Pie
                        data={{
                          labels: ['Conectados de la semana', 'Desconectados de la semana'],
                          datasets: [{
                            label: 'Conexiones',
                            data: rcantidadrol.map(({ _id, conexiones }, i) =>
                              [
                                conexiones
                              ]
                            ),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                            ],
                          }]

                        }}
                        options={{
                          layout: {
                            padding: 8,

                          },
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                  <div className="enlineasemana-body-dashboard-ysm">
                    <div className="conttitulo-enlinea-body-dashboard-ysm">
                      <div className="titulo-enlinea-body-dashboard-ysm">
                        Usuarios Conectados
                      </div>
                      <div className="ver-enlinea-body-dashboard-ysm">
                        <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                      </div>
                    </div>
                    <div className="subtitulo-enlinea-body-dashboard-ysm">
                      De la semana
                    </div>
                    <div className="grafico-enlinea-body-dashboard-ysm">
                      <Pie
                        data={{
                          labels: ['Conectados de la semana', 'Desconectados de la semana'],
                          datasets: [{
                            label: 'Conexiones',
                            data: [2, 3],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                            ],
                          }]

                        }}
                        options={{
                          layout: {
                            padding: 8,

                          },
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : (opcionDashboard == "Valores") ?
              <div className="body-dashboard-ysm">
                <div className="radios-body-dashboard-ysm">
                  <div className="primeralinea-valores-body-dashboard-ysm">
                    <div className="enlinea-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Usuarios Conectados
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        Ahora
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        {/* {usuariosonline.length} */}
                      </div>
                    </div>
                    <div className="enlineasemana-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Conexiones
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        De la semana
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        424
                      </div>
                    </div>
                    <div className="enlineasemana-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Publicaciones
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        Creados hasta la fecha
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        3523
                      </div>
                    </div>
                    <div className="enlineasemana-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Eventos
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        Creados hasta la fecha
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        53252
                      </div>
                    </div>
                  </div>
                  <div className="segundalinea-valores-body-dashboard-ysm">
                    <div className="enlinea-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Grupos de chat
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        Creados hasta la fecha
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        535
                      </div>
                    </div>
                    <div className="enlineasemana-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Canales de chat
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        Creados hasta la fecha
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        252
                      </div>
                    </div>
                    <div className="enlineasemana-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Usuarios registrados
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        Total hasta la fecha
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        5353
                      </div>
                    </div>
                    <div className="enlineasemana-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Usuarios Conectados
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        De la semana
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        5533
                      </div>
                    </div>
                  </div>
                  <div className="terceralinea-valores-body-dashboard-ysm">
                    <div className="enlinea-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Usuarios Conectados
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        De la semana
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        5353
                      </div>
                    </div>
                    <div className="enlineasemana-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Usuarios Conectados
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        De la semana
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        5353
                      </div>
                    </div>
                    <div className="enlineasemana-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Usuarios Conectados
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        De la semana
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        53535
                      </div>
                    </div>
                    <div className="enlineasemana-valores-body-dashboard-ysm">
                      <div className="conttitulo-enlinea-body-dashboard-ysm">
                        <div className="titulo-enlinea-body-dashboard-ysm">
                          Usuarios Conectados
                        </div>
                        <div className="ver-enlinea-body-dashboard-ysm">
                          <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                        </div>
                      </div>
                      <div className="subtitulo-enlinea-body-dashboard-ysm">
                        De la semana
                      </div>
                      <div className="numero-enlinea-body-dashboard-ysm">
                        5353
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : (opcionDashboard == "Graficos") ?
                <div className="body-dashboard-ysm">
                  <div className="radios-body-dashboard-ysm">
                    <div className="primeralinea-radios-body-dashboard-ysm">
                      <div className="enlinea-body-dashboard-ysm">
                        <div className="conttitulo-enlinea-body-dashboard-ysm">
                          <div className="titulo-enlinea-body-dashboard-ysm">
                            Conexiones
                          </div>
                          <div className="ver-enlinea-body-dashboard-ysm">
                            <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                          </div>
                        </div>
                        <div className="subtitulo-enlinea-body-dashboard-ysm">
                          Semanales
                        </div>
                        <div className="grafico-enlinea-body-dashboard-ysm">
                          <Bar
                            data={{
                              labels: [hoy7, hoy6, hoy5, hoy4, hoy3, hoy2, hoy],
                              datasets: [{
                                label: 'Conexiones',
                                data: [1, 2, 3, 4, 5, 6, 7],
                                backgroundColor: 'red',
                                color: 'white'
                              }]

                            }}

                            options={{
                              scales: {
                                xAxes: [
                                  {

                                    labelString: "Dias",
                                    display: true,
                                    fontColor: 'white',
                                  }

                                ],
                                yAxes: [
                                  {
                                    scales: {
                                      labelString: 'Porcentaje',
                                      display: true,
                                      fontColor: 'white',
                                    },
                                    ticks: {
                                      beginAtZero: true,
                                      fontColor: 'white',
                                    }
                                  }
                                ],
                              },
                              layout: {
                                padding: 8,

                              },
                              responsive: true,
                              maintainAspectRatio: false,

                            }}
                          />
                        </div>
                      </div>
                      <div className="enlineasemana-body-dashboard-ysm">
                        <div className="conttitulo-enlinea-body-dashboard-ysm">
                          <div className="titulo-enlinea-body-dashboard-ysm">
                            Conexiones
                          </div>
                          <div className="ver-enlinea-body-dashboard-ysm">
                            <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                          </div>
                        </div>
                        <div className="subtitulo-enlinea-body-dashboard-ysm">
                          Mensuales
                        </div>
                        <div className="grafico-enlinea-body-dashboard-ysm">
                          <Bar
                            data={{
                              labels: [hoy7, hoy6, hoy5, hoy4, hoy3, hoy2, hoy],
                              datasets: [{
                                label: 'Conexiones',
                                data: [1, 2, 3, 4, 5, 6, 7],
                                backgroundColor: 'red',
                                color: 'white'
                              }]

                            }}

                            options={{
                              scales: {
                                xAxes: [
                                  {

                                    labelString: "Dias",
                                    display: true,
                                    fontColor: 'white',
                                  }

                                ],
                                yAxes: [
                                  {
                                    scales: {
                                      labelString: 'Porcentaje',
                                      display: true,
                                      fontColor: 'white',
                                    },
                                    ticks: {
                                      beginAtZero: true,
                                      fontColor: 'white',
                                    }
                                  }
                                ],
                              },
                              layout: {
                                padding: 8,

                              },
                              responsive: true,
                              maintainAspectRatio: false,

                            }}
                          />
                        </div>
                      </div>
                      <div className="enlineasemana-body-dashboard-ysm">
                        <div className="conttitulo-enlinea-body-dashboard-ysm">
                          <div className="titulo-enlinea-body-dashboard-ysm">
                            Conexiones
                          </div>
                          <div className="ver-enlinea-body-dashboard-ysm">
                            <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                          </div>
                        </div>
                        <div className="subtitulo-enlinea-body-dashboard-ysm">
                          Por rango de edades
                        </div>
                        <div className="grafico-enlinea-body-dashboard-ysm">
                          <Bar
                            data={{
                              labels: [hoy7, hoy6, hoy5, hoy4, hoy3, hoy2, hoy],
                              datasets: [{
                                label: 'Conexiones',
                                data: [1, 2, 3, 4, 5, 6, 7],
                                backgroundColor: 'red',
                                color: 'white'
                              }]

                            }}

                            options={{
                              scales: {
                                xAxes: [
                                  {

                                    labelString: "Dias",
                                    display: true,
                                    fontColor: 'white',
                                  }

                                ],
                                yAxes: [
                                  {
                                    scales: {
                                      labelString: 'Porcentaje',
                                      display: true,
                                      fontColor: 'white',
                                    },
                                    ticks: {
                                      beginAtZero: true,
                                      fontColor: 'white',
                                    }
                                  }
                                ],
                              },
                              layout: {
                                padding: 8,

                              },
                              responsive: true,
                              maintainAspectRatio: false,

                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="segundalinea-radios-body-dashboard-ysm">
                      <div className="enlinea-body-dashboard-ysm">
                        <div className="conttitulo-enlinea-body-dashboard-ysm">
                          <div className="titulo-enlinea-body-dashboard-ysm">
                            Publicaciones
                          </div>
                          <div className="ver-enlinea-body-dashboard-ysm">
                            <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                          </div>
                        </div>
                        <div className="subtitulo-enlinea-body-dashboard-ysm">
                          Por semana
                        </div>
                        <div className="grafico-enlinea-body-dashboard-ysm">
                          <Bar
                            data={{
                              labels: [hoy7, hoy6, hoy5, hoy4, hoy3, hoy2, hoy],
                              datasets: [{
                                label: 'Conexiones',
                                data: [1, 2, 3, 4, 5, 6, 7],
                                backgroundColor: 'red',
                                color: 'white'
                              }]

                            }}

                            options={{
                              scales: {
                                xAxes: [
                                  {

                                    labelString: "Dias",
                                    display: true,
                                    fontColor: 'white',
                                  }

                                ],
                                yAxes: [
                                  {
                                    scales: {
                                      labelString: 'Porcentaje',
                                      display: true,
                                      fontColor: 'white',
                                    },
                                    ticks: {
                                      beginAtZero: true,
                                      fontColor: 'white',
                                    }
                                  }
                                ],
                              },
                              layout: {
                                padding: 8,

                              },
                              responsive: true,
                              maintainAspectRatio: false,

                            }}
                          />
                        </div>
                      </div>
                      <div className="enlineasemana-body-dashboard-ysm">
                        <div className="conttitulo-enlinea-body-dashboard-ysm">
                          <div className="titulo-enlinea-body-dashboard-ysm">
                            Eventos
                          </div>
                          <div className="ver-enlinea-body-dashboard-ysm">
                            <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                          </div>
                        </div>
                        <div className="subtitulo-enlinea-body-dashboard-ysm">
                          Por semana
                        </div>
                        <div className="grafico-enlinea-body-dashboard-ysm">
                          <Bar
                            data={{
                              labels: [hoy7, hoy6, hoy5, hoy4, hoy3, hoy2, hoy],
                              datasets: [{
                                label: 'Conexiones',
                                data: [1, 2, 3, 4, 5, 6, 7],
                                backgroundColor: 'red',
                                color: 'white'
                              }]

                            }}

                            options={{
                              scales: {
                                xAxes: [
                                  {

                                    labelString: "Dias",
                                    display: true,
                                    fontColor: 'white',
                                  }

                                ],
                                yAxes: [
                                  {
                                    scales: {
                                      labelString: 'Porcentaje',
                                      display: true,
                                      fontColor: 'white',
                                    },
                                    ticks: {
                                      beginAtZero: true,
                                      fontColor: 'white',
                                    }
                                  }
                                ],
                              },
                              layout: {
                                padding: 8,

                              },
                              responsive: true,
                              maintainAspectRatio: false,

                            }}
                          />
                        </div>
                      </div>
                      <div className="enlineasemana-body-dashboard-ysm">
                        <div className="conttitulo-enlinea-body-dashboard-ysm">
                          <div className="titulo-enlinea-body-dashboard-ysm">
                            Usuarios Conectados
                          </div>
                          <div className="ver-enlinea-body-dashboard-ysm">
                            <i class="fas fa-eye ver-dashboard-ysm" onClick={() => { VerTabla(); }}></i>
                          </div>
                        </div>
                        <div className="subtitulo-enlinea-body-dashboard-ysm">
                          De la semana
                        </div>
                        <div className="grafico-enlinea-body-dashboard-ysm">
                          <Bar
                            data={{
                              labels: [hoy7, hoy6, hoy5, hoy4, hoy3, hoy2, hoy],
                              datasets: [{
                                label: 'Conexiones',
                                data: [1, 2, 3, 4, 5, 6, 7],
                                backgroundColor: 'red',
                                color: 'white'
                              }]

                            }}

                            options={{
                              scales: {
                                xAxes: [
                                  {

                                    labelString: "Dias",
                                    display: true,
                                    fontColor: 'white',
                                  }

                                ],
                                yAxes: [
                                  {
                                    scales: {
                                      labelString: 'Porcentaje',
                                      display: true,
                                      fontColor: 'white',
                                    },
                                    ticks: {
                                      beginAtZero: true,
                                      fontColor: 'white',
                                    }
                                  }
                                ],
                              },
                              layout: {
                                padding: 8,

                              },
                              responsive: true,
                              maintainAspectRatio: false,

                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                ""}

      </div>
    </div>
  );
};
