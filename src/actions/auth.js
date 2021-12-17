import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchConAxios, fetchConToken, fetchSinToken } from "../helpers/fetch"
import { useSocket } from "../hooks/useSockets";
import { types } from "../types/types";


export const startLogin = (email, password) => {
    // const {checking} = useSelector(state => state.auth)
    // useEffect(() => {
    //     if(!checking){
    //         conectarSocket();
    //     }
   
    // }, [checking])
    return async(dispatch,getState) => {
     
        const resp = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        // const { checking } = getState().auth;
        // const {conectarSocket} = useSocket('http://localhost:4000')

        // if(!checking){
        //     conectarSocket();
        // }
       



        console.log(body);

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({uid: body.uid,
            name: body.name,
            email: body.email,
            segundoNombre: body.segundoNombre,
            apellidoPaterno: body.apellidoPaterno,
            area: body.area,
            fono: body.fono,
            nacimiento: body.nacimiento,
            ingreso: body.ingreso,
            rol: body.rol,
            cargo: body.cargo,
            empresa: body.empresa,
            permisos: body.permisos,
            imgusuario: body.imgusuario,
            theme: body.theme,
            }))
        }else{
            Swal.fire('email o contraseña incorrecta', '', 'error');
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        console.log(body);

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({uid: body.uid,
                name: body.name,
                email: body.email,
                segundoNombre: body.segundoNombre,
                apellidoPaterno: body.apellidoPaterno,
                area: body.area,
                fono: body.fono,
                nacimiento: body.nacimiento,
                ingreso: body.ingreso,
                rol: body.rol,
                cargo: body.cargo,
                empresa: body.empresa,
                permisos: body.permisos,
                rut: body.rut,
                imgusuario: body.imgusuario,
                theme: body.theme,
            }))
        }else{
          //  Swal.fire('Error', body.msg, 'error');
            dispatch(checkingFinish());
        }
    }
}
export const changeTheme = (user)=>{
    return async (dispatch) =>{
        try {
            const resp = await fetchConAxios(`auth/theme/${user}`,user, "PUT");
          const body = await JSON.stringify(resp.data.theme);
          console.log(JSON.parse(body))
          const data =  JSON.parse(body)
          if(body){
            console.log('ok')
            dispatch(login({uid: data.id,
                name: data.name,
                email: data.email,
                segundoNombre: data.segundoNombre,
                apellidoPaterno: data.apellidoPaterno,
                area: data.area,
                fono: data.fono,
                nacimiento: data.nacimiento,
                ingreso: data.ingreso,
                rol: data.rol,
                cargo: data.cargo,
                empresa: data.empresa,
                permisos: data.permisos,
                rut: data.rut,
                imgusuario: data.imgusuario,
                theme: data.theme,
            }))
          }
    
        }catch(error){
          Swal.fire('Hubo un error contacte con el administrador', '', 'error');
          console.log(error)
        }
      }
}
const checkingFinish = ()=>({type: types.authCheckingFinish});

const login = (user) => ({
    type: types.authLogin,
    payload:user
})

export const startLogout = () => {
    return (dispatch)=>{
        localStorage.clear();
        dispatch(logout());
    }
} 
const logout = () => ({type: types.authLogout})