import React from "react";
import App from "../components/App";
import NotFound from "./errors/NotFound";
import {Route, Switch} from "react-router-dom";

const Root = () => (
    <div className="root-container">
        <Switch>
            <Route exact path="/" component={App}/>
            <Route component={() => <NotFound helmet={true}/>}/>
        </Switch>
    </div>
);

export default Root
