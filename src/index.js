import React from "react";
import ReactDOM from "react-dom";
import Root from "./containers/Root";
import {persistor, store} from "./store/configureStore";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/es/integration/react";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <div style={{display: "flex", height: "100vh"}}>
                    <Root/>
                </div>
            </BrowserRouter>
        </PersistGate>
    </Provider>, document.getElementById('app')
);
