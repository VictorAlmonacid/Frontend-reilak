import React from 'react'

export const ButtonSquere = (props) => {
    return (
        <button className={`buttonSquere ${props.styleBtn}`} onClick={props.action}>
            <span>
            <i class={props.iconBtn}></i>
            </span>
            <span>{props.textBtn}</span>
        </button>
        
    
        
    )
}
