import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import RouteHandler from "./components/RouteHandler";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.module.scss";
import styles from "./App.module.scss";

const App = () => {
    return (
        <StrictMode>
            <Provider store={store}>            
                <ChakraProvider>
                    <div className={styles.App}>
                        <RouteHandler/>
                    </div>
                </ChakraProvider>
            </Provider>
        </StrictMode>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));