import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { birthdayStartAddChangeViewed, messageBirthdayStartLoading } from "../../actions/cumpleaños";
import moment from "moment";
import ReactPlayer from "react-player";

export const MyBirthday = () => {
  const [accordion, setAccordion] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messageBirthdayStartLoading());
  }, [dispatch]);
  const { message } = useSelector((state) => state.birthday);
  console.log(message);

  const datecompare = message.map((message) =>
    moment(message.fecha).format("DD-MM-YYYY")
  );
  console.log(datecompare);
  console.log(moment(new Date()).format("DD-MM-YYYY"));

  const handleViewed = (id)=>{
    dispatch(birthdayStartAddChangeViewed(id));
  }

  return (
    <div className="mybirthday">
      {datecompare.includes(moment(new Date()).format("DD-MM-YYYY")) && (
        <div>
          <div
            className="mybirthday__heard"
            onClick={() => setAccordion(!accordion)}
          >
            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/hq-o6A7TPpe.png?_nc_eui2=AeGGU6A8aXOypIv04S6g_xh1IDgIyy_WVG8gOAjLL9ZUb6p6DkCMUcdiSXRkwm5okpLKOc7SM8byc76OqjwogCUI" alt="Imagen regalo"/>
            <span>
              Los siguientes miembros te dedicaron un mensaje por tu cumpleaños{" "}
              {accordion ? (
                <i className="fas fa-chevron-down"></i>
              ) : (
                <i className="fas fa-chevron-right"></i>
              )}
            </span>
          </div>
          {accordion && (
            <div className="mybirthday__body">
              {message.map(({_id, message, userFelicitador, fecha, multimedia }, i) => (
                <div className="mybirthday__body-item">
                  <div className="mybirthday__body-item-top">
                    <div className="mybirthday__body-item-top-left">
                      <img src={userFelicitador.imgusuario} alt="Foto perfil" />
                    </div>
                    <div className="mybirthday__body-item-top-right">
                      <div className="mybirthday__body-item-top-right-name">
                        {userFelicitador.name} {userFelicitador.segundoNombre}{" "}
                        {userFelicitador.apellidoPaterno}{" "}
                        {userFelicitador.apellidoMaterno}
                      </div>
                      <div className="mybirthday__body-item-top-right-time">
                        {moment(fecha).format("DD-MM-YYYY, h:mm a")}
                      </div>
                    </div>
                  </div>
                  <div className="mybirthday__body-item-bottom">{message}</div>
                  <div className="publicaciones__multimedia">
                {multimedia.length > 0 ? (
                  multimedia.map((multimedia)=>(
                  multimedia.substr(-3) === "mp4" ? (
                    <div className="publicaciones__multimedia">
                      <ReactPlayer
                        url={multimedia}
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
              <div className="task__details-members-opts">
            <div className="input-button">
              <button type="submit" onClick={() => {handleViewed(_id)}}>Marcar como visto</button>
            </div>
          </div>
                </div>
              ))}

            </div>
          )}
        </div>
      )}
    </div>
  );
};
