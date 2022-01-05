// import React from 'react'

// export const DashboardChatsCreados = () => {

//     //UseDispatch
//     const dispatch = useDispatch();

//     //UseEffect
//     useEffect(() => {
//         dispatch(valoresCantidadTareas());
//     }, [dispatch])


//     //UseSelector
//     const {
//         dashboardcantidadtareas,
//     } = useSelector(state => state.dashboard);
//     console.log(dashboardcantidadtareas);



//     return (

//         <div className="dapartado">
//             <div className="dtitulo dtabla">
//                 <div className="opttabla">
//                     <ReactHTMLTableToExcel
//                         id="test-table-xls-button"
//                         className="download-table-xls-button"
//                         table="descargar-tabla-usuarios"
//                         filename="TablaUsuarios"
//                         sheet="Usuarios"
//                         buttonText="XLS" />
//                 </div>
//                 <div className="opttabla">
//                     Tabla de tareas
//                 </div>
//                 <div className="opttabla">

//                 </div>
//             </div>

//             <div
//                 className="dsubtitulo"

//             >

//             </div>

//             <div className="dinfo">
//                 <table id="descargar-tabla-usuarios">
//                     <thead>
//                         <tr>
//                             <th scope="col">Titulo</th>
//                             <th scope="col">Contenido</th>
//                             <th scope="col">Fecha creacion</th>
//                             <th scope="col">Fecha termino</th>
//                             <th scope="col">Usuario</th>
//                             <th scope="col">Estado</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {dashboardcantidadtareas.map((user, i) =>
//                             <tr>
//                                 <td data-label="Account">{user.titulo}</td>
//                                 <td data-label="Due Date">{user.contenido}</td>
//                                 <td data-label="Amount">{moment(user.fechaCreacion).format("DD-MM-yy")}</td>
//                                 <td data-label="Amount">{moment(user.fechaTermino).format("DD-MM-yy")}</td>
//                                 <td data-label="Amount">{user.name}</td>
//                                 <td data-label="Amount">{user.apellidoPaterno}</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export const DashboardChatsPersonal = () => {

//     //UseDispatch
//     const dispatch = useDispatch();

//     //UseEffect
//     useEffect(() => {
//         dispatch(valoresCantidadTareasProceso());
//     }, [dispatch])


//     //UseSelector
//     const {
//         dashboardcantidadtareasproceso
//     } = useSelector(state => state.dashboard);
//     console.log(dashboardcantidadtareasproceso);



//     return (

//         <div className="dapartado">
//             <div className="dtitulo dtabla">
//                 <div className="opttabla">
//                     <ReactHTMLTableToExcel
//                         id="test-table-xls-button"
//                         className="download-table-xls-button"
//                         table="descargar-tabla-usuarios"
//                         filename="TablaUsuarios"
//                         sheet="Usuarios"
//                         buttonText="XLS" />
//                 </div>
//                 <div className="opttabla">
//                     Tabla de tareas en proceso
//                 </div>
//                 <div className="opttabla">

//                 </div>
//             </div>

//             <div
//                 className="dsubtitulo"

//             >

//             </div>

//             <div className="dinfo">
//                 <table id="descargar-tabla-usuarios">
//                     <thead>
//                         <tr>
//                             <th scope="col">Titulo</th>
//                             <th scope="col">Contenido</th>
//                             <th scope="col">Fecha creacion</th>
//                             <th scope="col">Fecha termino</th>
//                             <th scope="col">Usuario</th>
//                             <th scope="col">Estado</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {dashboardcantidadtareasproceso.map((user, i) =>
//                             <tr>
//                                 <td data-label="Account">{user.titulo}</td>
//                                 <td data-label="Due Date">{user.contenido}</td>
//                                 <td data-label="Amount">{moment(user.fechaCreacion).format("DD-MM-yy")}</td>
//                                 <td data-label="Amount">{moment(user.fechaTermino).format("DD-MM-yy")}</td>
//                                 <td data-label="Amount">{user.name}</td>
//                                 <td data-label="Amount">{user.apellidoPaterno}</td>
//                             </tr>
//                         )}


//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export const DashboardChatsGrupal = () => {

//     //UseDispatch
//     const dispatch = useDispatch();

//     //UseEffect
//     useEffect(() => {
//         dispatch(valoresCantidadTareasAtrasadas());
//     }, [dispatch])


//     //UseSelector
//     const {
//         dashboardcantidadtareasatrasadas,
//         dashboardcantidadtareascompletadas
//     } = useSelector(state => state.dashboard);
//     console.log(dashboardcantidadtareasatrasadas);



//     return (

//         <div className="dapartado">
//             <div className="dtitulo dtabla">
//                 <div className="opttabla">
//                     <ReactHTMLTableToExcel
//                         id="test-table-xls-button"
//                         className="download-table-xls-button"
//                         table="descargar-tabla-usuarios"
//                         filename="TablaUsuarios"
//                         sheet="Usuarios"
//                         buttonText="XLS" />
//                 </div>
//                 <div className="opttabla">
//                     Tabla de tareas atrasadas
//                 </div>
//                 <div className="opttabla">

//                 </div>
//             </div>

//             <div
//                 className="dsubtitulo"

//             >

//             </div>

//             <div className="dinfo">
//                 <table id="descargar-tabla-usuarios">
//                     <thead>
//                         <tr>
//                             <th scope="col">Titulo</th>
//                             <th scope="col">Contenido</th>
//                             <th scope="col">Fecha creacion</th>
//                             <th scope="col">Fecha termino</th>
//                             <th scope="col">Usuario</th>
//                             <th scope="col">Estado</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {dashboardcantidadtareasatrasadas.map((user, i) => (moment(user.fechaTermino).format("DD-MM-yy") < moment().format("DD-MM-yy")) ?
//                             <tr>
//                                 <td data-label="Account">{user.titulo}</td>
//                                 <td data-label="Due Date">{user.contenido}</td>
//                                 <td data-label="Amount">{moment(user.fechaCreacion).format("DD-MM-yy")}</td>
//                                 <td data-label="Amount">{moment(user.fechaTermino).format("DD-MM-yy")}</td>
//                                 <td data-label="Amount">{user.name}</td>
//                                 <td data-label="Amount">{user.apellidoPaterno}</td>
//                             </tr>
//                             :
//                             "")}


//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export const DashboardChatsCanal = () => {

//     //UseDispatch
//     const dispatch = useDispatch();

//     //UseEffect
//     useEffect(() => {
//         dispatch(valoresCantidadTareasCompletadas());
//     }, [dispatch])


//     //UseSelector
//     const {
//         dashboardcantidadtareascompletadas
//     } = useSelector(state => state.dashboard);
//     console.log(dashboardcantidadtareascompletadas);



//     return (

//         <div className="dapartado">
//             <div className="dtitulo dtabla">
//                 <div className="opttabla">
//                     <ReactHTMLTableToExcel
//                         id="test-table-xls-button"
//                         className="download-table-xls-button"
//                         table="descargar-tabla-usuarios"
//                         filename="TablaUsuarios"
//                         sheet="Usuarios"
//                         buttonText="XLS" />
//                 </div>
//                 <div className="opttabla">
//                     Tabla de tareas completadas
//                 </div>
//                 <div className="opttabla">

//                 </div>
//             </div>

//             <div
//                 className="dsubtitulo"

//             >

//             </div>

//             <div className="dinfo">
//                 <table id="descargar-tabla-usuarios">
//                     <thead>
//                         <tr>
//                             <th scope="col">Titulo</th>
//                             <th scope="col">Contenido</th>
//                             <th scope="col">Fecha creacion</th>
//                             <th scope="col">Fecha termino</th>
//                             <th scope="col">Usuario</th>
//                             <th scope="col">Estado</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {dashboardcantidadtareascompletadas.map((user, i) =>
//                             <tr>
//                                 <td data-label="Account">{user.titulo}</td>
//                                 <td data-label="Due Date">{user.contenido}</td>
//                                 <td data-label="Amount">{moment(user.fechaCreacion).format("DD-MM-yy")}</td>
//                                 <td data-label="Amount">{moment(user.fechaTermino).format("DD-MM-yy")}</td>
//                                 <td data-label="Amount">{user.name}</td>
//                                 <td data-label="Amount">{user.apellidoPaterno}</td>
//                             </tr>
//                         )}


//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }