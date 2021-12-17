import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Publicaciones } from '../publicaciones/Publicaciones'
import { RightBar } from '../rightBar/RightBar'

export const HomeScreen = () => {
    const [themeFront, setThemeFront] = useState('');
const {theme} = useSelector(state => state.auth)

    useEffect(() => {
            setThemeFront(theme);
    }, [theme])
   
    
    return (
        <div className={`main__home ${themeFront==='dark'?'dark':''}`}>
            
                <Publicaciones />
            
        
                <RightBar />
         
        </div>
    )
}
