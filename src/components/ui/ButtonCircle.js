import React from "react";

export const ButtonCircle = (props) => {
  return (
    <button className={`buttonCircle ${props.styleBtn}`}>
      {props.textBtn}

      <span>
        <i class={props.iconBtn}> </i>
      </span>
    </button>
  );
};
