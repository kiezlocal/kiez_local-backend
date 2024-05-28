import "./App.css";
import { Routes, Route } from "react-router-dom";


function App(){
    return (
        <div className="App">
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quarters" element={<Quarters />} />

            </Routes>
        </div>
    )
}

export default App;

