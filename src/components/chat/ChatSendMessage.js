import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { SocketContext } from "../../context/SocketContext";
import { useSelector } from "react-redux";
import { fetchConToken, fetchConAxios } from "../../helpers/fetch";

const initImg = {
  img: "",
};
const fileName = {
  nameFile: "",
};
export const ChatSendMesagge = () => {
  const imgInput = useRef();

  const { socket } = useContext(SocketContext);
  const [emoji, setEmoji] = useState([]);
  const [selectEmoji, setSelectEmoji] = useState(false)
  const [message, setMessage] = useState("");
  const [loadFile, setLoadFile] = useState(false)
  const { chatActivo } = useSelector((state) => state.chat);
  const { uid } = useSelector((state) => state.auth);

  /***********************************************************
SUBIDA DE ARCHIVOS
**********************************************************/
  const [formValues, setFormValues] = useState(initImg);
  const [nameImg, setNameImg] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const imageHandleChange = (e) => {
    console.log(formValues)
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setNameImg(true);
      
    }
  };
  useEffect(() => {
    if (selectedFile) {
      console.log(selectedFile.name);
      formValues.img = selectedFile;
      console.log(selectedFile);

    }
  }, [selectedFile]);

  if( selectedFile){
    fileName.nameFile = selectedFile.name;
  }



  /************************************* */
  const cancelFile = (e) => {
    setSelectedFile(null);
    setNameImg(false)
    e.target = null;
    fileName.nameFile="";
    formValues.img="";

  };


  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject)
    setMessage(`${message}${emojiObject.emoji}`);
  };
  const handleOpenEmojiSelect = () => {
    setSelectEmoji(!selectEmoji);
  }

  const HandleOnChange = ({ target }) => {
    // setSelectedFile("")
    setMessage(target.value);
  };
  const handleSendMessage = async (e) => {
    setLoadFile(true)
    console.log(message)
    e.preventDefault();
    if (formValues.img) {
      const formData = new FormData();
      formData.set("img", formValues.img);
      try {
        const resp = await fetchConAxios("multimedias", formData, "POST");
        const body = await JSON.stringify(resp.data.multimedia);
 
       
        console.log("body", body);
        const img = body.replace(/['"]+/g, "");
     
        socket.emit("send-message", {
          from: uid,
          to: chatActivo.id,
          message: img,
          viewedby: [uid],
        });
        imgInput.current.value = ""
        // console.log(imgInput.current)
        setMessage("");
        setSelectedFile("");
        setLoadFile(false)
        setNameImg(false)
        initImg.img = "";
        fileName.nameFile = "";
        e.target.files = null;
        // console.log('llego al final')
        // console.log(message);
        // console.log(selectedFile);
        // console.log(formValues);
        return
      } catch (error) {
        console.log(error);
      }

    }
    if (message.length === 0) {
      console.log(message);
      console.log("llergo");
      return;
    }
    // e.target.files = null;
    // fileName.nameFile = "";
    // setNameImg(false)
    // if(ref.current){
    //   ref.current.value = ""
    // }
    socket.emit("send-message", {
      from: uid,
      to: chatActivo.id,
      message,
      viewedby: [uid],
    });
    setMessage('');





  };
{/* <div class="loader__message-file"></div> */}
{/* <i onClick={cancelFile} class="fa fa-times"></i> */}

const handleMoveMouse = (e)=>{
      if(chatActivo.lastmessage){
        if(chatActivo.lastmessage[0].viewedby.includes(uid)){
          console.log(uid);
          return
        }
        const id=chatActivo;
        const data = {
          id,
          uid
        }
        socket.emit("read-last-message", {
          data
        });
      }

}
  return (
    <>
      {(nameImg) && (
        <div className="sendMessage__files">
          <div className="sendMessage__files-item">
            <span style={(loadFile) ?{display:'flex'}:{}}>Multimedia: {fileName.nameFile} {!loadFile ? <i onClick={cancelFile} class="fa fa-times"></i>: <div class="loader__message-file"></div>} </span>

          </div>

        </div>
      )}

      {
      selectEmoji && <div className="sendMessage__emoji-select">
        <Picker  className="emoji" onEmojiClick={onEmojiClick} />
      </div>}
      {chatActivo.tipo === "canal" ? 
      chatActivo.admin.includes(uid) &&
      <form className="chat__SendMessage" onSubmit={handleSendMessage}>
      <div className="chat__SendMessage-left">
          <div className="chat__SendMessage-left-icon" onClick={handleOpenEmojiSelect}>
            <i class="far fa-grin"></i>
          </div>
          <div className="chat__SendMessage-left-icon">
            <input
              type="file"
              id="upload"
              ref={imgInput}
              hidden
              onChange={imageHandleChange}
              accept=".img,.png,.mp4,.jpg,.jepg,.gif"
            />
            <label for="upload">
              <i class="fas fa-photo-video"></i>
            </label>
          </div>
        </div>
        <div className="chat__SendMessage-right">
          <input
            onKeyPress="submit"
            className="chat__SendMessage-right-input"
            type="text"
            placeholder=" Escribe un mensaje"
            value={message}
            onChange={HandleOnChange}
            onMouseDown={handleMoveMouse}
          ></input>
        </div>
      </form>
      :
      <form className="chat__SendMessage" onSubmit={handleSendMessage}>
      <div className="chat__SendMessage-left">
          <div className="chat__SendMessage-left-icon" onClick={handleOpenEmojiSelect}>
            <i class="far fa-grin"></i>
          </div>
          <div className="chat__SendMessage-left-icon">
            <input
              type="file"
              id="upload"
              ref={imgInput}
              hidden
              onChange={imageHandleChange}
              accept=".img,.png,.mp4,.jpg,.jepg,.gif"
            />
            <label for="upload">
              <i class="fas fa-photo-video"></i>
            </label>
          </div>
        </div>
        <div className="chat__SendMessage-right">
          <input
            onKeyPress="submit"
            className="chat__SendMessage-right-input"
            type="text"
            placeholder=" Escribe un mensaje"
            value={message}
            onChange={HandleOnChange}
            onMouseDown={handleMoveMouse}
          ></input>
        </div>
      </form>
      }
    </>
  );
};
