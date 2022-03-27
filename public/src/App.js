import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import RouteHandler from "./components/RouteHandler";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const App = () => {
    return (
        <StrictMode>
            <Provider store={store}>
                <div className="App">
                    <RouteHandler/>
                </div>
            </Provider>
        </StrictMode>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));