// states
import { useEffect, useState } from "react";

//Images
import componyLogo from "../componyLogo.png";

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

    // Importing WEB3
    const web3 = window.web3;
    const loadTokenBalance = async () => {
      // Get Account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let userAccount = accounts[0];

      // Get Network ID
      let networkId = await web3.eth.net.getId();
      console.log("networkId", networkId);

      //func
      const tokenData = Token.networks[networkId];
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      let tokenBalance = await token.methods.balanceOf(userAccount).call();
      console.log("tokenBalance", window.web3.utils.fromWei(tokenBalance));
      setAccountTokenBalance(window.web3.utils.fromWei(tokenBalance));

      // Get all Stakes User have
      let ethSwap;
      const ethSwapData = LTCExchange.networks[networkId];
      if (ethSwapData) {
        ethSwap = new web3.eth.Contract(LTCExchange.abi, ethSwapData.address);
        let userAllStakes = await ethSwap.methods.userHistoryOfFunds().call();
        console.log("userAllStakes", userAllStakes);
        SetUserAllStakes(userAllStakes);
      }
    };
    loadTokenBalance();
  }, []);
  const [accountTokenBalance, setAccountTokenBalance] = useState(0);
  const [userAllStakes, SetUserAllStakes] = useState([
    "0xDC0d63a771be6Cfe7006d9641060b8Eff83F98b8",
    [],
  ]);

  async function withdDrawTokenWithIndex(stakeIndex, claimable) {
    if (claimable !== false) {
      // Importing WEB3
      const web3 = window.web3;

      // Get Account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("First accounts", accounts[0]);
      let userAccount = accounts[0];

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

      // WE have to give 1 parameters.
      // 1) Index

      setTimeout(async () => {
        ethSwap.methods
          ._withdrawStake(stakeIndex)
          .send({ from: userAccount })
          .on("transactionHash", (hash) => {
            console.log("Transaction Completed", hash);
            alert("Transaction Completed");
          });
      }, 2000);
    } else {
      alert("It is already Claimable");
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={componyLogo} className="App-logo" alt="logo" />
        <h1>WithDraw Test</h1>
        <br />
        <span style={{ color: "orange" }}>
          You have {accountTokenBalance} tokens
        </span>
        <h3>here we don't need any backend api to withdraw</h3>
        <span>
          first txt before comma is Amount, then, staked time, stake time
          period, status, user address, clamable
        </span>
        <br />
        <br />
        {userAllStakes[1].map((val, i) => (
          <p>{val.toString()}</p>
        ))}
        <br />
        <br />
        {userAllStakes[1].map((val, i) => (
          <>
            <a
              className="App-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => withdDrawTokenWithIndex(i, val[5])}
            >
              WithDraw Index No.{i} staked At:
              {new Date(val[1] * 1000).getHours()}:
              {new Date(val[1] * 1000).getMinutes()},{" "}
              {new Date(val[1] * 1000).getDate()}{" "}
              {new Date(val[1] * 1000).getMonth()}{" "}
              {new Date(val[1] * 1000).getFullYear()}
              {" - Time Period: "}
              {val[2]}
            </a>
            <br />
          </>
        ))}
      </header>
    </div>
  );
}
export default App;
