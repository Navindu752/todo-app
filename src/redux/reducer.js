import * as types from "./actionTypes";

const initialState = {
    users: [],
    user: {},
    loading: true,
};

const usersReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case types.DELETE_USERS:
        case types.ADD_USERS:
        case types.UPDATE_USER:
            return {
                ...state,
                loading: false
            };
        case types.GET_SINGLE_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default usersReducer;