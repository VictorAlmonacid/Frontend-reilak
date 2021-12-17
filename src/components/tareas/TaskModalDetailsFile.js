import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startLoadImageTarea, tareasStartUpdate } from '../../actions/tarea';

const initTask = {

    multimedia: [],

};

export const TaskModalDetailsFile = () => {

    const dispatch = useDispatch();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { activeTareas } = useSelector((state) => state.tareas);
    const [formValues, setFormValues] = useState(initTask);
    const imageHandleChange = (e) => {
        if (e.target.files) {

            setSelectedFiles([...selectedFiles, ...e.target.files]);
            console.log(e.target.files);
        }
    };
    useEffect(() => {
        if (selectedFiles) {
          console.log(selectedFiles.name)
          formValues.multimedia = selectedFiles;
          console.log((selectedFiles))
        }
      }, [selectedFiles])

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.set('id', activeTareas._id);
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('multimedia', selectedFiles[i]);
      
          }


        

        dispatch(tareasStartUpdate(formData));
        // dispatch(postClearActiveEvent());

    };

    return (
        <form onSubmit={handleSubmitForm}>
            <label htmlFor="">Cargar archivo</label>
            <input type="file" multiple onChange={imageHandleChange} />
            <div className="">
            <div className="input-button">
              <button type="submit">Subir</button>
            </div>
          </div>
        </form>
    )
}
