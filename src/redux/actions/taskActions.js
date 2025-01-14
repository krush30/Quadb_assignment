import { ADD_TASK, DELETE_TASK, LOGOUT, SET_WEATHER } from "../reducers/types";


export const addTasks = (task) => ({
    type: ADD_TASK,
    payload: task
})

export const deleteTasks = (index) => (dispatch, getState) => {
    dispatch({
        type: DELETE_TASK,
        payload: index
    });

};

export const fetchWeather = () => async (dispatch) => {
    try {
        const response = await fetch(
            "https://api.weatherapi.com/v1/current.json?key=420c7c6a5e6e48bcbf1150724251401&q=auto:ip"
        );
        const data = await response.json();
        dispatch({ type: SET_WEATHER, payload: data.current.condition.text });
    } catch (error) {
        dispatch({ type: SET_WEATHER, payload: "Error fetching weather" });
    }
};


