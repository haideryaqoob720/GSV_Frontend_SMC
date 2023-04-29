// states
import { useEffect, useState } from "react";

//Images
import componyLogo from "../componyLogo.png";

// abis
import LTCExchange from "../abis/LTCExchange.json";

import Web3 from "web3";

function App() {
  const [balanceOfEcoSystem, setBalanceOfEcoSystem] = useState(0);
  const [balanceOfCompanyReserve, setBalanceOfCompanyReserve] = useState(0);
  const [balanceOfpoolOfTeam, setBalanceOfpoolOfTeam] = useState(0);
  const [balanceOfpoolOfBDAndPartnership, setBalanceOfpoolOfBDAndPartnership] =
    useState(0);
  const [balanceOfpoolOfpoolOfMarketing, setBalanceOfpoolOfpoolOfMarketing] =
    useState(0);
  const [
    balanceOfpoolOfpoolOfLiquidityAndListing,
    setBalanceOfpoolOfpoolOfLiquidityAndListing,
  ] = useState(0);
  const [
    balanceOfpoolOfpoolOfpoolOfSeedSale,
    setBalanceOfpoolOfpoolOfpoolOfSeedSale,
  ] = useState(0);
  const [
    balanceOfpoolOfpoolOfpoolOfPrivateSale,
    setBalanceOfpoolOfpoolOfpoolOfPrivateSale,
  ] = useState(0);
  const [
    balanceOfpoolOfpoolOfpoolOfPublicSale,
    setBalanceOfpoolOfpoolOfpoolOfPublicSale,
  ] = useState(0);

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

      handleForPoolBlacnce();
    };
    loadWeb3();
  }, []);
  const [transferAmount, settransferAmount] = useState("0");

  // prettier-ignore
  async function handleForPoolBlacnce() {
    const web3 = window.web3;

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

        let balanceOfEcoSystem = await ethSwap.methods.poolOfEcosystem().call();
        setBalanceOfEcoSystem(balanceOfEcoSystem)

        let balanceOfCompanyReserve = await ethSwap.methods.poolOfCompanyReserve().call();
        setBalanceOfCompanyReserve(balanceOfCompanyReserve)

        let balanceOfpoolOfTeam = await ethSwap.methods.poolOfTeam().call();
        setBalanceOfpoolOfTeam(balanceOfpoolOfTeam)

        let balanceOfpoolOfBDAndPartnership = await ethSwap.methods.poolOfBDAndPartnership().call();
        setBalanceOfpoolOfBDAndPartnership(balanceOfpoolOfBDAndPartnership)

        let balanceOfpoolOfpoolOfMarketing = await ethSwap.methods.poolOfMarketing().call();
        setBalanceOfpoolOfpoolOfMarketing(balanceOfpoolOfpoolOfMarketing)

        let balanceOfpoolOfpoolOfLiquidityAndListing = await ethSwap.methods.poolOfLiquidityAndListing().call();
        setBalanceOfpoolOfpoolOfLiquidityAndListing(balanceOfpoolOfpoolOfLiquidityAndListing)

        let balanceOfpoolOfpoolOfpoolOfSeedSale = await ethSwap.methods.poolOfSeedSale().call();
        setBalanceOfpoolOfpoolOfpoolOfSeedSale(balanceOfpoolOfpoolOfpoolOfSeedSale)

        let balanceOfpoolOfpoolOfpoolOfPrivateSale = await ethSwap.methods.poolOfPrivateSale().call();
        setBalanceOfpoolOfpoolOfpoolOfPrivateSale(balanceOfpoolOfpoolOfpoolOfPrivateSale)

        let balanceOfpoolOfpoolOfpoolOfPublicSale = await ethSwap.methods.poolOfPublicSale().call();
        setBalanceOfpoolOfpoolOfpoolOfPublicSale(balanceOfpoolOfpoolOfpoolOfPublicSale)

        // tsting
        let getBalanceOfpoolOfEcosystem = await ethSwap.methods.getBalanceOfpoolOfCompanyReserve().call();
        console.log(getBalanceOfpoolOfEcosystem);
      }

  async function handletransferFunds() {
    let whichSegmentFromValue =
      document.getElementById("whichSegmentFrom").value;
    let whichSegmentToValue = document.getElementById("whichSegmentTo").value;
    if (
      transferAmount !== 0 &&
      whichSegmentFromValue !== "" &&
      whichSegmentToValue !== ""
    ) {
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
        .addLiquidyFromPoolToPool(
          window.web3.utils.toWei(transferAmount),
          whichSegmentFromValue,
          whichSegmentToValue
        )
        .send({ from: userAccount })
        .on("transactionHash", (hash) => {
          console.log("Transaction Completed", hash);
          alert("Transaction Completed");
          handleForPoolBlacnce();
        });
    } else {
      alert("Amount and Address cannot be Empty");
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={componyLogo} className="App-logo" alt="logo" />
        <h1>Transfer Funds From Pool To Pool</h1>
        <br />

        <span style={{ color: "orange" }}>
          Only pool admin can send tokens from pool to another pool
        </span>
        <br />
        <br />
        <div>
          <input
            type="number"
            name="name"
            placeholder="Enter Amount"
            onChange={(v) => settransferAmount(v.target.value)}
          />
          <select id="whichSegmentFrom">
            <option value="">(from) Choose Segmentation / Pool:</option>
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

          <select id="whichSegmentTo">
            <option value="">(to) Choose Segmentation / Pool:</option>
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
          onClick={() => handletransferFunds()}
        >
          Execute inter pool transfer
        </a>

        <br />
        <br />
        <div style={{ textAlign: "right" }}>
          <p>
            Balance: EcoSystem{" "}
            <span style={{ color: "orange" }}>
              {" "}
              {balanceOfEcoSystem !== 0
                ? window.web3.utils.fromWei(balanceOfEcoSystem)
                : 0}
            </span>
          </p>
          <p>
          Balance: CompanyReserve{" "}
            <span style={{ color: "orange" }}>
              {" "}
              {balanceOfCompanyReserve !== 0
                ? window.web3.utils.fromWei(balanceOfCompanyReserve)
                : 0}
            </span>
          </p>
          <p>
          Balance: Team{" "}
            <span style={{ color: "orange" }}>
              {" "}
              {balanceOfpoolOfTeam !== 0
                ? window.web3.utils.fromWei(balanceOfpoolOfTeam)
                : 0}
            </span>
          </p>
          <p>
          Balance: BDAndPartnership{" "}
            <span style={{ color: "orange" }}>
              {" "}
              {balanceOfpoolOfBDAndPartnership !== 0
                ? window.web3.utils.fromWei(balanceOfpoolOfBDAndPartnership)
                : 0}
            </span>
          </p>
          <p>
          Balance: Marketing{" "}
            <span style={{ color: "orange" }}>
              {" "}
              {balanceOfpoolOfpoolOfMarketing !== 0
                ? window.web3.utils.fromWei(balanceOfpoolOfpoolOfMarketing)
                : 0}
            </span>
          </p>
          <p>
          Balance: LiquidityAndListing{" "}
            <span style={{ color: "orange" }}>
              {" "}
              {balanceOfpoolOfpoolOfLiquidityAndListing !== 0
                ? window.web3.utils.fromWei(
                    balanceOfpoolOfpoolOfLiquidityAndListing
                  )
                : 0}
            </span>
          </p>
          <p>
          Balance: SeedSale{" "}
            <span style={{ color: "orange" }}>
              {" "}
              {balanceOfpoolOfpoolOfpoolOfSeedSale !== 0
                ? window.web3.utils.fromWei(balanceOfpoolOfpoolOfpoolOfSeedSale)
                : 0}
            </span>
          </p>
          <p>
          Balance: PrivateSale{" "}
            <span style={{ color: "orange" }}>
              {" "}
              {balanceOfpoolOfpoolOfpoolOfPrivateSale !== 0
                ? window.web3.utils.fromWei(
                    balanceOfpoolOfpoolOfpoolOfPrivateSale
                  )
                : 0}
            </span>
          </p>
          <p>
          Balance: PublicSale{" "}
            <span style={{ color: "orange" }}>
              {" "}
              {balanceOfpoolOfpoolOfpoolOfPublicSale !== 0
                ? window.web3.utils.fromWei(
                    balanceOfpoolOfpoolOfpoolOfPublicSale
                  )
                : 0}
            </span>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
