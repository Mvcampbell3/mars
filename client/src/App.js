import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
// import Header from './components/Header';
// pages
import LandingPage from "./pages/LandingPage";
// import RoverPage from "./pages/RoverPage";
import PhotoPage from "./pages/PhotoPage";
import SelectionPage from "./pages/SelectionPage";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <LandingPage {...props} />}
                    />
                    <Route
                        exact
                        path="/rovers"
                        render={(props) => <SelectionPage {...props} />}
                    />
                    <Route
                        exact
                        path="/photos"
                        render={(props) => <PhotoPage {...props} />}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
