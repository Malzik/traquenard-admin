import { combineReducers } from 'redux';
import { authReducer }     from "../auth/reducer";
import { rulesReducer }    from "../../feature/home/store/reducer";

const allReducers = combineReducers({
    auth: authReducer,
    rules: rulesReducer
});

export default allReducers;
