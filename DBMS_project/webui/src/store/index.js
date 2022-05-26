import { createStore } from "redux";     // 1. 
import rootReducer from "../reducers/index";
const store = createStore(rootReducer);  // 2. 
export default store;