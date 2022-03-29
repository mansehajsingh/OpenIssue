import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import RouteHandler from "./components/RouteHandler";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.module.scss";

const App = () => {
    return (
        <StrictMode>
            <ChakraProvider>
                <div className="App">
                    <RouteHandler />
                </div>
            </ChakraProvider>
        </StrictMode>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));