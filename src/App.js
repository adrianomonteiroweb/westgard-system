import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import AnaliticSystemPage from "./pages/AnaliticSystemPage/AnaliticSystemPage";
import BatchRegistrationPage from "./pages/BatchRegistrationPage/BatchRegistrationPage";
import BatchRecordPage from "./pages/BatchRecordPage/BatchRecordPage";
import ChartPage from "./pages/ChartPage/ChartPage";

// css style
import "./App.css";

// provider
import IsProvider from "./context/IsProvider";

function App() {
  return (
    <IsProvider>
      <div className="App">
        <div className="title-div">
          <img src="laac-logo.png" alt="LAAC" />
          <h2>Controle de qualidade</h2>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={[<AnaliticSystemPage key={"analitic"} />]} />
            <Route path="/batch-record" element={[<BatchRecordPage key={"batchRecord"} />]} />
            <Route path="/batch-registration" element={[<BatchRegistrationPage key={"batchReg"} />]} />
            <Route path="/chart" element={[<ChartPage key={"chart"} />]} />
          </Routes>
        </Router>
      </div>
    </IsProvider>
  );
}

export default App;
