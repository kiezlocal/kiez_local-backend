import ReactDOM from "react-dom";
import app from "./app";
import {BrowserRouter} from "react-router-dom";
require('dotenv').config();


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
)