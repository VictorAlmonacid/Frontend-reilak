import { fetchConToken, fetchConAxios } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

/************************************
 CREAR PUBLICACION
**************************************/
export const postStartAddNew = (event) => {
  return async(dispatch,getState ) => {
    const { uid, name } = getState().auth;
    try {
      let load = false;
      if(!load){
        Swal.fire('Espere mientras carga');
        Swal.showLoading()
      }
      const resp = await fetchConAxios("posts", event, "POST");
      
      const body = await JSON.stringify(resp.data.publicacion);
      // console.log(body);
      
      if (body) {
        load=true;
        event.id = body.id;
        event.user = {
          _id: uid,
          name: name,
        };
        // console.log(event);
        dispatch(postAddNew(JSON.parse(body)));
        // dispatch(postStartLoading());
        // dispatch(notificacionStartLoading());
        Swal.fire('Publicacion creada', '', 'success');
      }else{
        Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const postAddNew = (post) => ({
  type: types.postAddNew,
  payload: post,
});
/************************************
PUBLICACION ACTIVA
**************************************/
export const postSetActive = (post) => ({
  type: types.postSetActive,
  payload: post,
});

export const postClearActiveEvent = () => ({
  type: types.postClearActiveEvent,
});
/************************************
 ACTUALIZAR PUBLICACION
**************************************/
export const postStartUpdated = (event)=>{
  return async (dispatch) =>{
    try {
      let load = false;
      if(!load){
        Swal.fire('Espere mientras carga');
        Swal.showLoading()
      }
      const resp = await fetchConAxios(`posts/${event.id}`,event, "PUT");
      const body = await JSON.stringify(resp.data.publicacion);
      console.log(JSON.parse(body))
      if(body){
        load=true;
        console.log('ok')
        Swal.fire('Publicacion editada', '', 'success');
        dispatch(postUpdated(JSON.parse(body)));
        dispatch(postClearActiveEvent()); 
        // dispatch(postStartLoading());
      }

    }catch(error){
      Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      console.log(error)
    }
  }
}
const postUpdated = (post) => ({
  type: types.postUpdated,
  payload: post,
});
/************************************
 REACCIONAR PUBLICACION
**************************************/
export const ReaccionStartUpdate = (post)=>{
  return async (dispatch) =>{
    try {
      const resp = await fetchConAxios(`posts/reaccion/${post.id}`,post, "PUT");
      const body = await JSON.stringify(resp.data.publicacion);
      console.log(body)
      if(body){
        console.log('ok')
        // Swal.fire('Publicacion editada', '', 'success');
        // dispatch(eventUpdate(event));
        dispatch(postStartLoading());
      }

    }catch(error){
      Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      console.log(error)
    }
  }
}


/************************************
 ELIMINAR PUBLICACION
**************************************/
export const postStartDelete = ()=>{
  return async (dispatch,getState) =>{
    const { id } = getState().post.activePost;
    try {
      const resp = await fetchConToken(`posts/${id}`,{}, "DELETE");
      const body = await resp.json();
      console.log(body)
      if(JSON.parse(body.ok)){
        console.log('ok')
        Swal.fire('Publicacion eliminada', '', 'success');
        dispatch(postDeleted());
        // dispatch(postStartLoading());
      }

    }catch(error){
      Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      console.log(error)
    }
  }
}
 const postDeleted = () => ({
  type: types.postDeleted,
});
/************************************
 LISTAR PUBLICACION
**************************************/
export const postStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("posts");
      const body = await resp.json();
      console.log(body);
      const posts = body.publicaciones;
      console.log(body.publicaciones)
      dispatch(postLoaded(posts));
    } catch (error) {
      console.log(error);
    }
  };
};

const postLoaded = (posts) => ({
  type: types.postLoaded,
  payload: posts,
});
/************************************
 LISTAR NOTIFICACION
**************************************/
export const notificacionStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("posts/notificacion/");
      const body = await resp.json();
      console.log(body);
      const notificacion = body.notificacion;
      console.log(body.notificacion)
      dispatch(notificacionLoaded(notificacion));
    } catch (error) {
      console.log(error);
    }
  };
};

const notificacionLoaded = (notificacion) => ({
  type: types.notificacionLoaded,
  payload: notificacion,
});

/************************************
 REACCIONAR PUBLICACION
**************************************/
export const notificacionStartUpdate = (id)=>{
  return async (dispatch) =>{
    try {
      const resp = await fetchConAxios(`posts/notificacion/`,{id}, "PUT");
      const body = await JSON.stringify(resp.data);
      console.log(body)
      if(body){
        console.log('ok')
        // Swal.fire('Publicacion editada', '', 'success');
        // dispatch(eventUpdate(event));
        dispatch(notificacionStartLoading());
      }

    }catch(error){
      Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      console.log(error)
    }
  }
}