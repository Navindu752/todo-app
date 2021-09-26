import * as types from "./actionTypes";

const initialState = {
    users: [],
    user: {},
    loading: true,
};

const notesReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case types.GET_NOTES:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case types.DELETE_NOTE:
        case types.ADD_NOTE:
        case types.UPDATE_NOTE:
            return {
                ...state,
                loading: false
            };
        case types.GET_SINGLE_NOTE:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default notesReducer;