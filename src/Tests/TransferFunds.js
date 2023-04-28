// states
import { useEffect, useState } from "react";
import { ethers } from "ethers";

//Images
import logo from "../logo.svg";

// abis
import Token from "../abis/DaiToken.json";
import LTCExchange from "../abis/LTCExchange.json";

import Web3 from "web3";

function App() {
  useEffect(() => {
    const loadWeb3 = async () => {
      // load WEB3
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };
    loadWeb3();
  }, []);
  const [userAddr, setuserAddr] = useState("");
  const [transferAmount, settransferAmount] = useState("0");

  async function handletransferFunds(timeStaked) {
    let whichSegmentValue = document.getElementById("whichSegment").value;
    if (userAddr !== "" && transferAmount !== 0 && whichSegmentValue !== "") {
      // Importing WEB3
      const web3 = window.web3;

      // Get Account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("First accounts", accounts[0]);
      let userAccount = accounts[0];
      console.log(userAccount);

      // Get Network ID
      let networkId = await web3.eth.net.getId();
      console.log("networkId", networkId);

      // Load LTCExchange
      let ethSwap = {};
      const ethSwapData = LTCExchange.networks[networkId];
      if (ethSwapData) {
        ethSwap = new web3.eth.Contract(LTCExchange.abi, ethSwapData.address);
      } else {
        window.alert("Invalid Network Id.");
      }

      ethSwap.methods
        .transferFunds(
          window.web3.utils.toWei(transferAmount),
          userAddr,
          timeStaked,
          whichSegmentValue
        )
        .send({ from: userAccount })
        .on("transactionHash", (hash) => {
          console.log("Transaction Completed", hash);
          alert("Transaction Completed");
        });
    } else {
      alert("Amount and Address cannot be Empty");
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Transfer Funds Test</h1>
        <br />
        <span>TokenAddr: 0x837DFC1B3732DE6EEAa1cE7c3AfFEd74D49c158a</span>
        <span>Acc6: 0x3997d3AccEBad60EbAe81B2191F81f9055b3B420</span>
        <span>Acc7: 0xDF99f983073112a7e4D582cBf77c690d9ea7F39a</span>
        <br />

        {/* <h3>click the btn below to check the swap functionality</h3>
        <span> now I am giving 5777 for 0.1 bnb</span> */}
        <span style={{ color: "orange" }}>
          Only pool admin can send money from their pool
        </span>
        <br />
        <br />
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter User Address"
            onChange={(v) => setuserAddr(v.target.value)}
          />
          <input
            type="number"
            name="name"
            placeholder="Enter Amount"
            onChange={(v) => settransferAmount(v.target.value)}
          />
          <select id="whichSegment">
            <option value="">Choose Segmentation / Pool:</option>
            <option value="1">Ecosystem</option>
            <option value="2">CompanyReserve</option>
            <option value="3">Team</option>
            <option value="4">BDAndPartnership</option>
            <option value="5">Marketing</option>
            <option value="6">LiquidityAndListing</option>
            <option value="7">SeedSale</option>
            <option value="8">PrivateSale</option>
            <option value="9">PublicSale</option>
          </select>
        </div>
        <br />
        <br />
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handletransferFunds(12)}
        >
          Transfer Fund For 12 Month (Team)
        </a>
        <br />
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handletransferFunds(15)}
        >
          Transfer Fund For 15 Month (Private Seed)
        </a>
        <br />
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handletransferFunds(18)}
        >
          Transfer Fund For 18 Month (Seed Sale)
        </a>
        <br />
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handletransferFunds(24)}
        >
          Transfer Fund For 24 Month (Optional)
        </a>
      </header>
    </div>
  );
}

export default App;
