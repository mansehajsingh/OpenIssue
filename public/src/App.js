import React from "react";
import ReactDOM from "react-dom";
import RouteHandler from "./components/RouteHandler";

const App = () => {
    return (
        <React.StrictMode>
            <div className="App">
                <RouteHandler/>
            </div>
        </React.StrictMode>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));