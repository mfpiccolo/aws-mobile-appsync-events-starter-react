import combineReducers from "combine-reducers";
import events from "./events";
import comments from "./comments";

export default combineReducers({ events, comments });
