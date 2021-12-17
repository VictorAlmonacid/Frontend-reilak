import React from 'react'
import { TaskBody } from './TaskBody'
import { TaskHeader } from './TaskHeader'

export const ScreenTarea = () => {
    return (
        <div className="main__home">
            <div className="task">
                    <TaskHeader />
                    <TaskBody />
            </div>
        </div>
    )
}
