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
          <div className="logo">GSV Metaverse</div>
          <ul className="nav-links">
            <div className="menu">
              <li>
                <a href="/">Transfer Funds</a>
              </li>
              {/* <li>
                <a href="/WithDrawTestWatchStakes">WithDrawTestWatchStakes</a>
              </li> */}
              <li>
                <a href="/TransferFundsToPool">Transfer Funds to Pool</a>
              </li>
              <li>
                <a href="/AdminTest">Audit</a>
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
          <Route
            path="/TransferFundsToPool"
            element={<TransferFundsToPool />}
          />
          <Route path="/AdminTest" element={<AdminTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
