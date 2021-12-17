import React, { useState, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Modal from "react-modal";
import { EditorState, convertToRaw, convertFromHTML, ContentState } from "draft-js";
import { uiCloseModal } from "../../actions/ui";
import {
  postClearActiveEvent,
  postStartAddNew,
  postStartUpdated,
} from "../../actions/post";
import { convertToHTML } from "draft-convert";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';

const customStyles = {
  content: {
    top: "50%",
    border: 'none',
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0",
    margin: "0",
    transform: "translate(-50%, -50%)",
    backgroundColor: "$blanco-2",
  },
  overlay: {
    transition: "opacity .2s ease-in-out",
    backgroundColor: "rgba(53, 5, 5, 0.3)",
  },
};

const initEvent = {
  titulo: "",
  contenido: "",
  multimedia: [],

};

const fileName = {
  nameFile: ""
}

export const ModalPublicacion = () => {

  const imgInput = useRef();
  const dispatch = useDispatch();
  /***********************************************************
  TEXTO ENRIQUECIDO
  **********************************************************/
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  const { modalOpen } = useSelector((state) => state.ui);
  const [activePostFile, setActivePostFile] = useState(false)
  const { activePost } = useSelector((state) => state.post);
  const [titleValid, setTitleValid] = useState(true);
  const [formValues, setFormValues] = useState(initEvent);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    console.log(convertToRaw(editorState.getCurrentContent()))
    // convertContentToHTML();
  };


  /***********************************************************
  SUBIDA DE ARCHIVOS
  **********************************************************/

  useEffect(() => {
    setActivePostFile(true)
  }, [activePost])
  const [selectedFiles, setSelectedFiles] = useState([]);

  const imageHandleChange = (e) => {
    if (e.target.files) {

      setSelectedFiles([...selectedFiles,...e.target.files]);
      console.log(e.target.files);
      imgInput.current.value = ""
    }
  };
  useEffect(() => {
    if (selectedFiles) {
      console.log(selectedFiles.name)
      formValues.multimedia = selectedFiles;
      console.log((selectedFiles))
    }
  }, [selectedFiles])


  // fileName.nameFile = selectedFile.name;

  const handleRemoveFile = (file)=>{

    const remove = [...selectedFiles].filter((filesSelect)=>{
      return filesSelect.name !== file.name
    })
    setSelectedFiles(remove)
  }


  const handleRemoveFileUpdate = ()=>{
    console.log(selectedFiles)
  }

  const { titulo, contenido } = formValues;
  console.log(activePost)
  useEffect(() => {
    if (activePost) {
      const contentBlock = htmlToDraft(activePost.contenido);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
      }
      setFormValues(activePost);
    } else {
      setFormValues(initEvent);
      initEvent.contenido = ""
    }
  }, [activePost, setFormValues]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    setFormValues(initEvent);
    setSelectedFiles("");
    setEditorState(EditorState.createEmpty());
    // dispatch(postClearActiveEvent());

  };
  const cancelFile = () => {
    setSelectedFiles("")
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('titulo', formValues.titulo);
    formData.set('contenido', draftToHtml(convertToRaw(editorState.getCurrentContent())));
    const files = selectedFiles;
    // formValues.multimedia.forEach((files)=>formData.append('multimedia', files));
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('multimedia', selectedFiles[i]);

    }
    console.log(formData.get("multimedia"));



    if (titulo.trim().length < 2) {
      return setTitleValid(false);
    }
    if (activePost) {
      setActivePostFile(false)
      formData.set('id', activePost.id);
      
      dispatch(postStartUpdated(formData));
      // dispatch(postClearActiveEvent());
    } else {
      dispatch(postStartAddNew(formData));
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
    >
      <form className="modal__post" onSubmit={handleSubmitForm}>
        <div className="modal__post-heard">
          <div className="modal__post-heard-title">
            <h4>{activePost ? "Editar publicación" : "Crear publicación"}</h4>
          </div>
        </div>
        <div className="modal__post-body">
          <div className="modal__post-body-form">
            <div className="modal__post-body-form-input">
              <input className="modal__post-body-form-input-title" type="text" id="title" autoComplete="off" required onChange={handleInputChange} name="titulo" value={titulo} />
              <label className="modal__post-body-form-input-title-label" for="title">Titulo</label>
            </div>
            <div className="modal__post-body-form-input">
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                createFromText='hola'
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                localization={{
                  locale: "es",
                }}
                toolbar={{
                  options: [
                    'inline', 'blockType', 'fontSize', 'fontFamily', 'emoji', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
                  inline: {
                    inDropdown: false,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: ['bold', 'italic', 'underline', 'strikethrough'],
                  },
                  blockType: {
                    inDropdown: true,
                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
                }}
              />
            </div>
            <div className="modal__post-body-form-input">
              <div className="modal__post-body-form-input-file">

                <label for="file"><i class="fas fa-photo-video"></i> <span> Adjuntar Archivo</span></label>
                <input type="file" name="file" multiple id="file" ref={imgInput} onChange={imageHandleChange} accept=".img,.png,.mp4,.jpg,.jepg,.gif" />
              </div>
            </div>
            <div className="modal__post-body-form-input-view">
              {selectedFiles.length > 0 ? [...selectedFiles].map((files) => (
                files.name.substr(-3) === "mp4" ? <div className="modal__post-body-form-input-previewimg">
                  <ReactPlayer
                    url={URL.createObjectURL(files)}
                    width="100%"
                    height="100%"
                    controls
                    volume="0.8"
                  />
                  <span onClick={()=>{handleRemoveFile(files)}}><i class="fas fa-times"></i></span>
                </div>
                  :
                  <div className="modal__post-body-form-input-previewimg">
                    <img src={URL.createObjectURL(files)} /><span onClick={()=>{handleRemoveFile(files)}}><i class="fas fa-times"></i></span>
                  </div>

              ))
              :
             
              activePostFile && activePost && activePost.multimedia.length > 0 && activePost.multimedia.map((files) => (
                files.substr(-3) === "mp4" ? <div className="modal__post-body-form-input-previewimg">
                  <ReactPlayer
                    url={files}
                    width="100%"
                    height="100%"
                    controls
                    volume="0.8"
                  />
                 
                </div>
                  :
                  <div className="modal__post-body-form-input-previewimg">
                    <img src={files} />
                  </div>

              ))
           
              }
            </div>
            <div className="modal__post-body-form-btn">
            <div className="">
            <div className="input-button">
              <button type="submit">Guardar</button>
            </div>
          </div>
            </div>
          </div>
        </div>

      </form>
    </Modal>
  );
};
