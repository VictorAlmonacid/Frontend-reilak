import React, { useEffect, useState } from "react";
import { ModalPublicacion } from "./ModalPublicacion";
import { ListaPublicaciones } from "./ListaPublicaciones";

import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';
import { changeTheme } from "../../actions/auth";
import { Button, ButtonSquere } from "../ui/ButtonSquere";
import { ButtonCircle } from "../ui/ButtonCircle";



export const Publicaciones = () => {
  const [themeFront, setThemeFront] = useState('');
  const { theme } = useSelector(state => state.auth)

  useEffect(() => {
    setThemeFront(theme);
  }, [theme])
  const { rol } = useSelector(state => state.auth);
  const { uid } = useSelector(state => state.auth);

  const handleChangeTheme = () => {
    dispatch(changeTheme(uid));
  }
  const dispatch = useDispatch();

  const handleClickNew = () => {
    dispatch(uiOpenModal());
  }


  return (
    // <div className={`publicaciones ${themeFront === 'dark' ? 'dark' : ''}`}>
    <div className="publicaciones">
      {(rol === 'Administrador') &&
        <div className="btn__publicar">

          <ButtonSquere action={handleClickNew} textBtn="Crear publicacion" iconBtn="fas fa-plus" styleBtn="clr-primary" />


        </div>
        //<button  className="btn__publicar" onClick={handleClickNew}><span><i className="fas fa-plus"></i> Crear publicacion</span></button>

      }
      {/* <div><i class="fas fa-adjust" style={{ color: 'red' }} onClick={handleChangeTheme}></i></div> */}


      <ModalPublicacion />
      <ListaPublicaciones />
    </div>
  );
};
