import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";
import persist from "redux-zero-persist";
import { initialState } from './State';
import localforage from 'localforage';

const config = {
    key: "root",
    storage: localforage
}


const persistMiddleware = persist(config, (err, state) => {
    if (err) {
        console.error(err);
    } else {
        store.setState(state);
    }
});


const middlewares = applyMiddleware(
    persistMiddleware,
    //antoherMiddleware
);


const store = createStore(initialState, middlewares);
//const store = createStore(initialState);

export default store;