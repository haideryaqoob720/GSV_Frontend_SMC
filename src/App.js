import { Routes, Route, BrowserRouter } from "react-router-dom";

// Tests
import TransferFunds from "./Tests/TransferFunds";
// import WithDrawTestWatchStakes from "./Tests/WithDrawTestWatchStakes";
import AdminTest from "./Tests/AdminTest";
import TransferFundsToPool from "./Tests/TransferFundsToPool";

// CSS
import "./App.css";

function App() {
  return (
    <>
      <div>
        <nav className="navbar">
          <div className="logo">GSV Contract Test</div>
          <ul className="nav-links">
            <div className="menu">
              <li>
                <a href="/">TransferFunds</a>
              </li>
              {/* <li>
                <a href="/WithDrawTestWatchStakes">WithDrawTestWatchStakes</a>
              </li> */}
              <li>
                <a href="/TransferFundsToPool">TransferFundsToPool</a>
              </li>
              <li>
                <a href="/AdminTest">AdminTest</a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TransferFunds />} />
          {/* <Route
            path="/WithDrawTestWatchStakes"
            element={<WithDrawTestWatchStakes />}
          /> */}
          <Route path="/TransferFundsToPool" element={<TransferFundsToPool />} />
          <Route path="/AdminTest" element={<AdminTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
