import { combineReducers } from "redux";
import notesReducer from "./reducer";

const rootReducer=combineReducers({
    data: notesReducer
});

export default rootReducer;