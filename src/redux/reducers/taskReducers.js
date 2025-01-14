import { ADD_TASK, DELETE_TASK, SET_WEATHER } from "./types";

const initialState = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    weather: "",
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((_, index) => index !== action.payload),
            };
        case SET_WEATHER:
            return { ...state, weather: action.payload };
        default:
            return state;
    }
};

export default taskReducer;