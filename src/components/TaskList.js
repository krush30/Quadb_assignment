import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTasks, fetchWeather } from '../redux/actions/taskActions';

const TaskList = () => {
    const tasks = useSelector(state => state.tasks.tasks);
    const weather = useSelector(state => state.tasks.weather || "");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWeather());
    }, [dispatch]);



    return (
        <div className="bg-gradient-to-b from-blue-500 to-blue-700 bg-opacity-90 text-white rounded-xl p-4 sm:p-6 md:w-3/4 lg:w-1/2 mx-auto mt-8 shadow-lg">
            {weather && (
                <div className="bg-yellow-500 text-blue-900 rounded-lg p-2 sm:p-4 shadow-md mb-4 sm:mb-6 text-center">
                    <p className="text-base sm:text-lg font-semibold">Current Weather:</p>
                    <p className="text-lg sm:text-xl font-bold">{weather}</p>
                </div>
            )}
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">Tasks</h2>
            <ul className="space-y-3 sm:space-y-4">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <li
                            key={index}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-blue-200 text-blue-900 p-3 sm:p-4 rounded-lg shadow-md"
                        >
                            <span className="font-semibold text-sm sm:text-base">
                                {task.task}
                                <span className="text-xs sm:text-sm text-blue-700"> ({task.priority})</span>
                            </span>
                            <button
                                onClick={() => dispatch(deleteTasks(index))}
                                className="mt-2 sm:mt-0 bg-red-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-sm sm:text-base text-blue-100">No tasks available.</p>
                )}
            </ul>
        </div>


    )
}

export default TaskList;
