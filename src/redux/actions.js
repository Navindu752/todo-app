import axios from "axios";
import * as types from "./actionTypes";

const getNotes = (users) => ({
    type: types.GET_NOTES,
    payload:users,
});

const noteDeleted = () => ({
    type:types.DELETE_NOTE,
});

const noteAdded = () => ({
    type:types.ADD_NOTE,
});

const noteUpdated= () => ({
    type:types.UPDATE_NOTE,
});

const getNote = (user) => ({
    type:types.GET_SINGLE_NOTE,
    payload:user,
});

export const loadNotes = () => {
    return function (dispatch){
        axios
        .get(`${process.env.REACT_APP_API}`)
        .then((resp) => {
            console.log("resp",resp);
            dispatch(getNotes(resp.data));
        })
        .catch((error) => console.log(error));
    };
};
export const deleteNote = (id) => {
    return function (dispatch){
        axios
        .delete(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("resp",resp);
            dispatch(noteDeleted());
            dispatch(loadNotes());
        })
        .catch((error) => console.log(error));
    };
};

export const addNote = (user) => {
    return function (dispatch){
        axios
        .post(`${process.env.REACT_APP_API}`,user)
        .then((resp) => {
            console.log("resp",resp);
            dispatch(noteAdded());
            //dispatch(loadNotes());
        })
        .catch((error) => console.log(error));
    };
};

export const getSingleNote = (id) => {
    return function (dispatch){
        axios
        .get(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("resp",resp);
            dispatch(getNote(resp.data));
            //dispatch(loadNotes());
        })
        .catch((error) => console.log(error));
    };
};

export const updateNote = (user,id) => {
    return function (dispatch){
        axios
        .put(`${process.env.REACT_APP_API}/${id}`,user)
        .then((resp) => {
            console.log("resp",resp);
            dispatch(noteUpdated());
            //dispatch(loadNotes());
        })
        .catch((error) => console.log(error));
    };
};