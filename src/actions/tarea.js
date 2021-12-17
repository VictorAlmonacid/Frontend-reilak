import { fetchConToken, fetchConAxios } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";


export const tareasStartLoading = () => {
    return async (dispatch) => {
      try {
        const resp = await fetchConToken("tareas");
        const body = await resp.json();
        console.log(body);
        const tareas = body.tareas;
        console.log(body.tareas)
        dispatch(tareasLoaded(tareas));
      } catch (error) {
        console.log(error);
      }
    };
  };

  const tareasLoaded = (tareas) => ({
    type: types.tareasLoaded,
    payload: tareas,
  });



  //________________________________________________________________


  export const tareasStartAddNew = (tareas) => {
    return async(dispatch,getState ) => {
      const { uid, name } = getState().auth;
      try {
        const resp = await fetchConAxios("tareas", tareas, "POST");
  
        const body = await JSON.stringify(resp.data.tareas);
        // console.log(body)
  
  
        if (body) {
          tareas.id = body.id;
          tareas.user = {
            _id: uid,
            name: name,
          };
          // console.log(event);
          dispatch(tareasAddNew(tareas));
          dispatch(tareasStartLoading());
          Swal.fire('tareas creada', '', 'success');
        }else{
          Swal.fire('Hubo un error contacte con el administrador', '', 'error');
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  const tareasAddNew = (tareas) => ({
    type: types.tareasAddNew,
    payload: tareas,
  });

  //___________________________________________________________________________

  export const tareasStartUpdate = (tareas)=>{
    return async (dispatch) =>{
      try {
        const resp = await fetchConAxios(`tareas/${tareas.id}`,tareas, "PUT");
        const body = await JSON.stringify(resp.data.tareas);
        console.log(JSON.parse(body));
        if(body){
          console.log('ok')
          Swal.fire('tareas editada', '', 'success');
          dispatch(tareasUpdate(body));
          dispatch(tareasSetActive(JSON.parse(body)));
          dispatch(tareasStartLoading());
          
        }
  
      }catch(error){
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
        console.log(error)
      }
    }
  }
  const tareasUpdate = (tareas) => ({
    type: types.tareasUpdated,
    payload: tareas,
  });



  export const tareasSetActive = (tareas) => ({
    type: types.tareasSetActive,
    payload: tareas,
  });


  //____________________________________________________________________________________


  export const tareasStartDelete = (_id)=>{
    return async (dispatch) =>{
      try {
        const resp = await fetchConToken(`tareas/${_id}`,{}, "DELETE");
        const body = await resp.json();
        console.log(body)
        if(body.ok){
          console.log('ok')
          Swal.fire('Tareas eliminada', '', 'success');
          dispatch(tareasDeleted());
          dispatch(tareasStartLoading());
        }
  
      }catch(error){
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
        console.log(error)
      }
    }
  }
   const tareasDeleted = () => ({
    type: types.tareasDeleted,
  });

  //____

  export const TareasMarcaUpdate = (tareas)=>{
    return async (dispatch) =>{
      try {
        const resp = await fetchConAxios(`tareas/estado/${tareas.id}`,tareas, "PUT");
        const body = await JSON.stringify(resp.data.tareas);
        console.log(body)
        if(body){
          console.log('ok')
          // Swal.fire('Publicacion editada', '', 'success');
          // dispatch(eventUpdate(event));
          dispatch(tareasStartLoading());
        }
  
      }catch(error){
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
        console.log(error)
      }
    }
  }

  /***********************
   * startLoadImageTarea
   */
  export const startLoadImageTarea = (tarea)=>{
    return async (dispatch)=>{
      try {

        const resp = await fetchConToken(`tareas/images/${tarea}`);
        const body = await resp.json();
        console.log(body);
        const messageimg = body.imgTarea;
        console.log(body.imgTarea)
        dispatch(tareasImageLoaded(messageimg));
      } catch (error) {
        console.log(error);
      }
     }
  }
  const tareasImageLoaded = (tareas) => ({
    type: types.tareasImageLoaded,
    payload: tareas,
  });

  /*******************
   * REMOVE IMAGEN TAREA
   ***********************/

  export const tareaStartRemoveImg = (id)=>{
    return async (dispatch) =>{
      try {
        const resp = await fetchConAxios(`tareas/images/${id.id}`,{id}, "DELETE");
        const body = await JSON.stringify(resp.data);
        const newBody = JSON.parse(body);
        console.log(newBody.newList)
        if(body){
          console.log('ok')
          Swal.fire('Publicacion eliminada', '', 'success');
          dispatch(tareasImageLoaded(newBody.newList));
          // dispatch(eventStartLoading());
        }
  
      }catch(error){
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
        console.log(error)
      }
    }
  }
   const imageTareaDeleted = () => ({
    type: types.imageTareaDeleted,
  });

  /*************************
   * Add image
   ************************/

  export const tareaUploadImage = (formData)=>{
    return async (dispatch) =>{
      try {
        const resp = await fetchConAxios("multimedias/tarea", formData, "POST");
        const body = await JSON.stringify(resp.data.imagenTarea);
        console.log("body", body);
        const img = body.replace(/['"]+/g, "");
        dispatch(ImageTareaAddNew(JSON.parse(body)));
        console.log(img)
        return
      } catch (error) {
        console.log(error);
      }
    }
  }
  const ImageTareaAddNew = (tareas) => ({
    type: types.ImageTareaAddNew,
    payload: tareas,
  });


  /*****************
   * CREATE COMENTARIO
   */

  export const startCreateComment = (formValues)=>{
    return async (dispatch) =>{
      try {
        const resp = await fetchConAxios("tareas/comentarios", formValues, "POST");
        const body = await JSON.stringify(resp.data.comentario);
        console.log("body", body);
        // const img = body.replace(/['"]+/g, "");
        dispatch(createComment(JSON.parse(body)));
        // console.log(img)
        return
      } catch (error) {
        console.log(error);
      }
    }
  }
  const createComment = (tareas) => ({
    type: types.createComment,
    payload: tareas,
  });

  /*******************
   * LOAD COMENTAROS
   */
   export const startLoadComentarios = (tarea)=>{
    return async (dispatch)=>{
      try {

        const resp = await fetchConToken(`tareas/comentarios/${tarea}`);
        const body = await resp.json();
        console.log(body);
        const messageimg = body.comentarioTarea;
        console.log(body.comentarioTarea)
        dispatch(LoadComentarios(messageimg));
      } catch (error) {
        console.log(error);
      }
     }
  }
  const LoadComentarios = (tareas) => ({
    type: types.LoadComentarios,
    payload: tareas,
  });


  ////////****************Imagen********** */
    //___________________________________________________________________________

    export const tareasStartDeleteImg = (tareaId, fileId)=>{
      return async (dispatch) =>{
        try {
          const resp = await fetchConAxios(`tareas/img/${tareaId}`,fileId, "PUT");
          const body = await JSON.stringify(resp.data.tareas);
          console.log(JSON.parse(body));
          if(body){
            console.log('ok')
            Swal.fire('tareas editada', '', 'success');
            dispatch(tareasUpdate(body));
            dispatch(tareasSetActive(JSON.parse(body)));
            dispatch(tareasStartLoading());
            
          }
    
        }catch(error){
          Swal.fire('Hubo un error contacte con el administrador', '', 'error');
          console.log(error)
        }
      }
    }
  
  