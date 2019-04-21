import rootReducer from "../reducers";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import {persistReducer, persistStore} from "redux-persist";

const initialState = {
    banner: {
        error: null,
        list: []
    },
    category: {
        error: null,
        list: []
    },
    modal: {
        active: false,
        messageList: []
    }
};

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export {store, persistor}
