import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  postSetActive,
  postStartDelete,
  ReaccionStartUpdate,
  postStartLoading,
} from "../../actions/post";
import moment from "moment";
import { uiOpenModal } from "../../actions/ui";
import { MyBirthday } from "./MyBirthday";

export const ListaPublicaciones = () => {
  const [themeFront, setThemeFront] = useState('');
  const {theme} = useSelector(state => state.auth)
  
      useEffect(() => {
              setThemeFront(theme);
      }, [theme])

  const [optPost, setOptPost] = useState(null);
  const { uid } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  const handleOpenOptPost = (post) => {
    console.log(post)
    if(optPost){
      if(post.id===optPost.id){
        setOptPost(null);
        return
      }
    }
    setOptPost(post);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postStartLoading());
  }, [dispatch]);

  // Eliminar publicacion
  const eliminarPublicacion = (post) => {
    dispatch(postSetActive(post));
    dispatch(postStartDelete());

  };
  // editar publicacion
  const editarPublicacion = (post) => {
    dispatch(postSetActive(post));
    dispatch(uiOpenModal());
    setOptPost(null);
  };

  const handleReaccion = (post) => {
    const id ={post};
    dispatch(ReaccionStartUpdate(id));
  };



  return (
    <div className="lista__publicaciones">
      <MyBirthday />
      {posts.length > 0 ? (
        posts.map(
          (
            post,
            i
          ) => (
            <div key={post.id} className={`card__publicaciones ${themeFront==='dark'?'dark':''}`}>
              <div className="publicaciones__heard">
                <div className="publicaciones__heard-top">
                  <div className="publicaciones__heard-top-titulo">
                    {post.titulo}
                  </div>
                  {post.usuario === uid && (

                    <div className="publicaciones__heard-top-option">
                      <div className="publicaciones__heard-top-option-btn" onClick={() => { handleOpenOptPost(post) }}>
                        <i className="fas fa-ellipsis-h fa-lg"> </i>
                      </div>
{optPost&& optPost.id===post.id && 
                      <div
                        className="publicaciones__heard-top-option-content"
                        data-id={i}
                      >
                        
                        <li
                          className="publicaciones__heard-top-option-content-list"
                          onClick={() => {
                            eliminarPublicacion(post);
                          }}
                        >
                          <i className="fas fa-trash">
                            {" "}
                            <span>Eliminar</span>
                          </i>
                        </li>
                        <li
                          className="publicaciones__heard-top-option-content-list"
                          onClick={() => {
                            editarPublicacion(post);
                          }}
                        >
                          <i className="fas fa-pen">
                            {" "}
                            <span>Editar</span>
                          </i>
                        </li>
                      </div>
                      }
                    </div>
                  )}
                </div>
                <div className="publicaciones__heard-bottom">
                  <span className="publicaciones__heard-bottom-fecha">
                    {moment(post.fecha).format("DD-MM-YYYY, h:mm a")}
                  </span>
                </div>
              </div>

              <div className="publicaciones__texto">
                <div dangerouslySetInnerHTML={{ __html: post.contenido }} />
              </div>
              <div className="publicaciones__multimedia">
                {post.multimedia.length > 0 ? (
                  post.multimedia.map((multimedia)=>(
                  multimedia.substr(-3) === "mp4" ? (
                    <div className="publicaciones__multimedia">
                      <ReactPlayer
                        url={post.multimedia}
                        width="100%"
                        height="100%"
                        controls
                        volume="0.8"
                      />
                    </div>
                  ) : (
                    <img src={multimedia} width="100%" height="100%" />
                  )
                  ))
                ) : (
                  ""
                )}
              </div>

              <div className="publicaciones__footer">
                <div
                  className="publicaciones__reaccion"
                  onClick={() => {
                    handleReaccion(post.id);
                  }}
                >
                  {post.reaccion && post.reaccion.includes(uid) ? (
                    <i className="fas fa-heart"></i>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}
                </div>
                <div> {post.reaccion ? post.reaccion.length : 0}</div>
              </div>
            </div>
          )
        )
      ) : (
        <div className="no-publicaciones">No existen publicaciones</div>
      )}
    </div>
  );
};
