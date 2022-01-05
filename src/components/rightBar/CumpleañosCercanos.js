import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  birthdayStartAddNew,
  birthdayStartLoading,
} from "../../actions/cumpleaños";
import Modal from "react-modal";
import Picker from "emoji-picker-react";
import ReactPlayer from "react-player";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "$blanco-2",
  },
  overlay: {
    transition: "opacity .2s ease-in-out",
    backgroundColor: "rgba(53, 5, 5, 0.3)",
  },
};

const initMessage = {
  message: "",
  felicitado: "",
  multimedia: [],
};

export const CumpleañosCercanos = () => {
  const dispatch = useDispatch();
  const imgInput = useRef();
  const [formValues, setFormValues] = useState(initMessage);
  const [selectEmoji, setSelectEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    dispatch(birthdayStartLoading());
  }, []);
  const { birthday } = useSelector((state) => state.birthday);
  console.log(birthday);

  const [modal, setModal] = useState(false);

  const handleOpenModal = (id) => {
    setModal(true);
    formValues.felicitado = id;
  };
  const closeModal = (e) => {
    e.preventDefault();
    setModal(false);
  };

  const handleCreateMessage = (e) => {
    e.preventDefault();
    console.log('hola')
    formValues.message = message;
    const formData = new FormData();
    formData.set('message', formValues.message);
    formData.set('felicitado', formValues.felicitado);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('multimedia', selectedFiles[i]);

    }
    dispatch(birthdayStartAddNew(formData));
    setMessage("");
    setFormValues(initMessage);
    setSelectedFiles([]);
    setModal(false);
  };



  const handleInputChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleOpenEmojiSelect = () => {
    setSelectEmoji(!selectEmoji);
  };
  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setMessage(`${message}${emojiObject.emoji}`);
  };

  const handleRemoveFile = (file) => {
    const remove = [...selectedFiles].filter((filesSelect) => {
      return filesSelect.name !== file.name;
    });
    setSelectedFiles(remove);
  };
  const imageHandleChange = (e) => {
    if (e.target.files) {
      setSelectedFiles([...selectedFiles, ...e.target.files]);
      console.log(e.target.files);
      imgInput.current.value = "";
    }
  };
  return (
    <div className="cumpleaños">
      <div className="cumpleaños__header">
        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/hq-o6A7TPpe.png?_nc_eui2=AeGGU6A8aXOypIv04S6g_xh1IDgIyy_WVG8gOAjLL9ZUb6p6DkCMUcdiSXRkwm5okpLKOc7SM8byc76OqjwogCUI" />
        <div> cumpleaños del dia</div>
      </div>
      <div className="cumpleaños__body">
        {birthday != 0 ? (
          birthday.map(
            (
              {
                name,
                segundoNombre,
                apellidoPaterno,
                apellidoMaterno,
                imgusuario,
                id,
              },
              i
            ) => (
              <div className="cumpleaños__body-item">
                <div className="cumpleaños__body-item-top">
                  <img src={imgusuario} />
                  <div>
                    {name} {segundoNombre} <br />
                    {apellidoPaterno} {apellidoMaterno}
                  </div>
                </div>
                <div className="cumpleaños__body-item-bottom">
                  <button
                    className="btn__felicitar"
                    onClick={() => {
                      handleOpenModal(id);
                    }}
                  >
                    Dedicar un mensaje
                  </button>
                </div>
              </div>
            )
          )
        ) : (
          <div className="nobirthdays">Hoy no hay cumpleaños</div>
        )}
      </div>

      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={1}
        // className="modal modal-publicacion"
        // overlayClassName="modal-fondo"
      >
        <form className="birthday__modal" onSubmit={handleCreateMessage}>
          <div className="birthday__modal-header">
            Dedicale unas palabras en su dia
          </div>

          <div className="birthday__modal-body">
            <div className="birthday__modal-body-emoji">
              <div
                className="chat__SendMessage-left-icon"
                onClick={handleOpenEmojiSelect}
              >
                <i class="far fa-grin"></i>
              </div>
              {selectEmoji && (
                <div className="sendMessage__emoji-select-birthday">
                  <Picker className="emoji" onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Dedicale un mensaje"
              name="message"
              autoComplete="off"
              onChange={handleInputChange}
              value={message}
            />
          </div>
          <div className="modal__post-body-form-input-file">
            <label for="file">
              <i class="fas fa-photo-video"></i> <span> Adjuntar Archivo</span>
            </label>
            <input
              type="file"
              name="file"
              multiple
              id="file"
              ref={imgInput}
              onChange={imageHandleChange}
              accept=".img,.png,.mp4,.jpg,.jepg,.gif"
            />
          </div>
          <hr/>
          <div className="modal__post-body-form-input-view">
            {selectedFiles.length > 0
              ? [...selectedFiles].map((files) =>
                  files.name.substr(-3) === "mp4" ? (
                    <div className="modal__post-body-form-input-previewimg">
                      <ReactPlayer
                        url={URL.createObjectURL(files)}
                        width="100%"
                        height="100%"
                        controls
                        volume="0.8"
                      />
                      <span
                        onClick={() => {
                          handleRemoveFile(files);
                        }}
                      >
                        <i class="fas fa-times"></i>
                      </span>
                    </div>
                  ) : (
                    <div className="modal__post-body-form-input-previewimg">
                      <img src={URL.createObjectURL(files)} />
                      <span
                        onClick={() => {
                          handleRemoveFile(files);
                        }}
                      >
                        <i class="fas fa-times"></i>
                      </span>
                    </div>
                  )
                )
              : <div>No has adjuntado ningun archivo</div>}
          </div>
          <hr/>
          <div className="birthday__modal-footer">
            <button type="submit" className="birthday__modal-btn">
              Enviar
            </button>
            <button className="birthday__modal-btn" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
