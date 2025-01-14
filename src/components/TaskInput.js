import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTasks } from '../redux/actions/taskActions';
import TaskList from './TaskList';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import wimg from "../img/wimg.jpg.jpg"


const TaskInput = () => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState("Medium");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleAddTask = () => {
        const newTask = { task, priority };
        if (task.trim()) {
            dispatch(addTasks(newTask));
            setTask("");

            const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedTasks = [...existingTasks, newTask];

            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }
    };
    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("tasks");
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="task-input relative">
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <img
                    className="h-screen w-full object-cover sm:h-auto md:h-full no-scrollbar"
                    src={wimg}
                    alt="weather-bg"
                />
            </div>

            <div className="bg-gradient-to-b from-blue-500 to-blue-700 bg-opacity-90 text-white rounded-xl p-6 sm:p-8 md:p-10 md:w-3/4 lg:w-1/2 mx-auto mt-12 sm:mt-16 shadow-lg relative z-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Task Manager</h1>
                <TaskList />
                <div className="flex flex-col gap-3 sm:gap-4">
                    <input
                        type="text"
                        placeholder="Enter task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="p-2 sm:p-3 w-full bg-blue-200 text-blue-900 rounded-lg shadow-inner placeholder-blue-600"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 sm:p-3 w-full bg-blue-200 text-blue-900 rounded-lg shadow-inner"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between">
                        <button
                            onClick={handleAddTask}
                            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 text-blue-900 font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-all"
                        >
                            Add Task
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default TaskInput;
