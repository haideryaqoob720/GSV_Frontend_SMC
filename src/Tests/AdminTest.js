// states
import { useEffect, useState } from "react";

// abis
import Token from "../abis/DaiToken.json";
import LTCExchange from "../abis/LTCExchange.json";

import Web3 from "web3";

function App() {
  const [allFundsOfExchange, setAllFundsOfExchange] = useState([]);
  const [filteredAllFundsOfExchange, setFilteredAllFundsOfExchange] = useState(
    []
  );

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

      // Importing WEB3
      const web3 = window.web3;

      // Get Network ID
      let networkId = await web3.eth.net.getId();
      console.log("networkId", networkId);

      // Get all Stakes User have
      const ethSwapData = LTCExchange.networks[networkId];
      if (ethSwapData) {
        // console.log(await web3.eth.getBalance(ethSwapData.address));
        setExchangeBNBBalance(
          window.web3.utils.fromWei(
            await web3.eth.getBalance(ethSwapData.address)
          )
        );

        //func
        const tokenData = Token.networks[networkId];
        const token = new web3.eth.Contract(Token.abi, tokenData.address);
        let tokenBalance = await token.methods
          .balanceOf(ethSwapData.address)
          .call();
        console.log("tokenBalance", window.web3.utils.fromWei(tokenBalance));
        setExchangeTokenBalance(window.web3.utils.fromWei(tokenBalance));

        //func for get rate of 0.1 bnb
        let ethSwap = new web3.eth.Contract(
          LTCExchange.abi,
          ethSwapData.address
        );

        const formatedArray1 = await ethSwap.methods
          .exchangeHistoryOfFunds()
          .call();
        // console.log("userHistoryOfFundsuserHistoryOfFunds", formatedArray1);
        // formatedArray1.shift(0)
        let exchangeWholeStakeData2 = [];
        let allStakedAmount2 = [];
        formatedArray1.map(function (item, index) {
          let exchangeWholeStakeData = [];
          for (let i = 0; i < item.address_stakes.length; i++) {
            exchangeWholeStakeData.push(item.address_stakes[i]);
          }
          setTimeout(() => {
            exchangeWholeStakeData.map(function (item, index) {
              exchangeWholeStakeData2.push(item);

              allStakedAmount2.push(
                window.web3.utils.fromWei(item.amount.toString(), "Ether")
              );
            });
            console.log(exchangeWholeStakeData2);
            setAllFundsOfExchange(exchangeWholeStakeData2);
            setFilteredAllFundsOfExchange(exchangeWholeStakeData2);
          }, 1);
        });

      }
    };
    loadWeb3();
  }, []);
  const [exchangeTokenBalance, setExchangeTokenBalance] = useState(0);
  const [exchangeBNBBalance, setExchangeBNBBalance] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>Admin Test</h1>
        <h3>click the btns to test admin functions functionality</h3>
        <span>
          Change the wallet address to check that only admin can able to
          withdraws
        </span>

        <br />
        <br />
        <span style={{ color: "orange" }}>
          Exchange Token Balance: {exchangeTokenBalance} GSV
        </span>
        <br />
        <span style={{ color: "orange" }}>
          {/* Exchange BNB Balance: {window.web3.utils.fromWei(exchangeBNBBalance)}{" "} */}
          Exchange BNB Balance: {exchangeBNBBalance} BNB
        </span>
        <br />

        <br />
        <div className="fundsHistory">
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setFilteredAllFundsOfExchange(allFundsOfExchange)}
          >
            All
          </a>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              let founded = allFundsOfExchange.filter(
                (v) => v.poolName === "Ecosystem"
              );
              setFilteredAllFundsOfExchange(founded);
            }}
          >
            Eco-system
          </a>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              let founded = allFundsOfExchange.filter(
                (v) => v.poolName === "CompanyReserve"
              );
              setFilteredAllFundsOfExchange(founded);
            }}
          >
            Company Reserve
          </a>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              let founded = allFundsOfExchange.filter(
                (v) => v.poolName === "Team"
              );
              setFilteredAllFundsOfExchange(founded);
            }}
          >
            Team
          </a>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              let founded = allFundsOfExchange.filter(
                (v) => v.poolName === "BDAndPartnership"
              );
              setFilteredAllFundsOfExchange(founded);
            }}
          >
            BD And Partnership
          </a>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              let founded = allFundsOfExchange.filter(
                (v) => v.poolName === "Marketing"
              );
              setFilteredAllFundsOfExchange(founded);
            }}
          >
            Marketing
          </a>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              let founded = allFundsOfExchange.filter(
                (v) => v.poolName === "LiquidityAndListing"
              );
              setFilteredAllFundsOfExchange(founded);
            }}
          >
            Liquidity And Listing
          </a>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              let founded = allFundsOfExchange.filter(
                (v) => v.poolName === "SeedSale"
              );
              setFilteredAllFundsOfExchange(founded);
            }}
          >
            Seed Sale
          </a>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              let founded = allFundsOfExchange.filter(
                (v) => v.poolName === "PrivateSale"
              );
              setFilteredAllFundsOfExchange(founded);
            }}
          >
            Private Sale
          </a>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              let founded = allFundsOfExchange.filter(
                (v) => v.poolName === "PublicSale"
              );
              setFilteredAllFundsOfExchange(founded);
            }}
          >
            Public Sale
          </a>
        </div>
        <br />
        <br />

        <table class="styled-table">
          <thead>
            <tr>
              <th>ID #</th>
              <th>Admin Address</th>
              <th>User Address</th>
              <th>Staked Amount</th>
              <th>Time Staked</th>
              <th>Segmentation</th>
              <th style={{ textAlign: "right" }}>Manual Audit</th>
            </tr>
          </thead>
          <tbody>
            {filteredAllFundsOfExchange.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {value.poolAdminAddr.substr(0, 6) +
                    " ... " +
                    value.poolAdminAddr.substr(
                      value.poolAdminAddr.length - 6,
                      6
                    )}
                </td>
                <td>
                  {value.user.substr(0, 6) +
                    " ... " +
                    value.user.substr(value.user.length - 6, 6)}
                </td>
                <td>
                  {window.web3.utils.fromWei(value.amount.toString(), "Ether")}{" "}
                  GSV
                </td>
                <td>{value.timeStaked} Months</td>
                <td>{value.poolName}</td>
                <td>
                  <a
                    href={`https://bscscan.com/address/${value.user}`}
                    target="_blank"
                    style={{ color: "#61DAFB", border: "none" }}
                  >
                    {"---->"}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
