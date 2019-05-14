import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import Routers from "./routers";
import LoadingPage from "src/components/LoadingPage";

class App extends React.Component {
    render() {
        return (
            <Suspense fallback={<LoadingPage />}>
                <Switch>{Routers}</Switch>
            </Suspense>
        );
    }
}

export default App;
