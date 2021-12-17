import { fetchConToken, fetchConAxios } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";



/************************************
 CREAR CHAT
**************************************/

export  const chatAddNew = (chat) => ({
    type: types.chatAddNew,
    payload: chat,
  });


/************************************
 LISTAR chats
**************************************/
export const chatStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("chat");
      const body = await resp.json();
      const chats = body.chat;
      dispatch(chatLoaded(chats));
    } catch (error) {
      console.log(error);
    }
  };
};

const chatLoaded = (chats) => ({
  type: types.chatLoaded,
  payload: chats,
});

/************************
 activar chat
 *********************/
export const activarChat = (chats)=>({
  type: types.activarChat,
  payload: chats,
})


/**********************
 *SEND MESSAGE
 ********************/
export const MessageAddNew = (message)=>({
  type: types.MessageAddNew,
  payload: message,
})

/************************************
 LISTAR MESSAGES
**************************************/
export const messageStartLoading = (chat) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`chat/message/${ chat }`);
      const body = await resp.json();
      const chats = body.message;
      dispatch(messageLoaded(chats));
    } catch (error) {
      console.log(error);
    }
  };
};

const messageLoaded = (chats) => ({
  type: types.messageLoaded,
  payload: chats.reverse(),
});


/******
 listar miembros
 */

 export const chatStartMembers = (chat) =>{
 
   return async (dispatch)=>{
    try {
      const resp = await fetchConToken(`chat/miembros/${ chat }`);
      const body = await resp.json();
    
      const miembros = body.miembros;
      dispatch(membersLoadedView(miembros));
    } catch (error) {
      console.log(error);
    }
   }
 }
  const membersLoadedView = (miembros)=>({
  type: types.memberViewsLoaded,
  payload: miembros,
 })
 export const membersLoaded = (miembros)=>({
  type: types.membersLoaded,
  payload: miembros,
 })


 /************ultima conexion************* */

 export const conexionStartLoading = (chat)=>{
  return async (dispatch)=>{
   try {
     const resp = await fetchConToken(`conexion/user/${ chat }`);
     const body = await resp.json();
     const conexion = body.conexion;
     dispatch(conexionLoaded(conexion));
   } catch (error) {
     console.log(error);
   }
  }
}
export const conexionLoaded = (conexion)=>({
 type: types.conexionLoaded,
 payload: conexion,
})

/****************CARGAR IMAGENES CHAT *****************/
export const imagesChatStartLoaded = (chat)=>{
  return async (dispatch)=>{
    try {
      const resp = await fetchConToken(`chat/images/${ chat }`);
      const body = await resp.json();
      console.log(body);
      const messageimg = body.message;
      console.log(body.message)
      dispatch(imagesChatLoaded(messageimg));
    } catch (error) {
      console.log(error);
    }
   }
}
const imagesChatLoaded = (messageimg)=>({
  type: types.messageimgLoaded,
  payload: messageimg,
 })



 /****************CARGAR VIDEOS CHAT *****************/
export const videoChatStartLoaded = (chat)=>{
  return async (dispatch)=>{
    try {
      const resp = await fetchConToken(`chat/videos/${ chat }`);
      const body = await resp.json();
      console.log(body);
      const messageimg = body.message;
      console.log(body.message)
      dispatch(videoChatLoaded(messageimg));
    } catch (error) {
      console.log(error);
    }
   }
}
const videoChatLoaded = (messageimg)=>({
  type: types.videoChatLoaded,
  payload: messageimg,
 })


  /****************CARGAR VIDEOS CHAT *****************/
export const miembrosNOChatStartLoaded = (chat)=>{
  return async (dispatch)=>{
    try {
      const resp = await fetchConToken(`chat/nomembers/${ chat }`);
      const body = await resp.json();
      console.log(body);
      const messageimg = body.miembros;
      console.log(body.miembros)
      dispatch(miembrosNOChatLoaded(messageimg));
    } catch (error) {
      console.log(error);
    }
   }
}
const miembrosNOChatLoaded = (messageimg)=>({
  type: types.miembrosNOChatLoaded,
  payload: messageimg,
 })


export const StartRemoveUserChat = (user)=>{
  return async (dispatch) =>{
    try {
      const resp = await fetchConAxios(`chat/miembro/${user._id}`,user, "PUT");
      const body = await JSON.stringify(resp.data.miembro);
      console.log(body)
      if(body){
        console.log('ok')
        // Swal.fire('Publicacion editada', '', 'success');
        // dispatch(eventUpdate(event));
        dispatch(chatStartMembers(user.idChat));
        dispatch(chatStartLoading());
      }

    }catch(error){
      Swal.fire('Hubo un error contacte con el administrador', '', 'error');
      console.log(error)
    }
  }
}