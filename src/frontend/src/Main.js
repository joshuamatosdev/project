import {BrowserRouter} from "react-router-dom";
import React from "react";
import App from "./App";



    function Main() {
        return (
            <div className="container-fluid">
                <BrowserRouter>
                    <App />
            </BrowserRouter>
            </div>
        );
    }

    export default Main;