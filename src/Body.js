import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/Auth';
import TaskInput from './components/TaskInput';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Auth />
        },
        {
            path: "/tasklinput",
            element: <TaskInput />
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body;
