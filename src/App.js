import { Route, Link } from "react-router-dom";
import Candidate from "./components/CandidateRegister";
import VoterRegister from "./components/VoterRegister";
import Winner from "./components/Winner";
import Vote from "./contracts/Vote.json";
import Web3 from "web3";
import { useEffect, useState } from "react";
import "./App.css";
import ElectionCommision from "./components/ElectionCommision";



function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    async function init() {
      const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      const web3 = new Web3(provider);
      //console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Vote.networks[networkId];
      //console.log("Contract Address:", deployedNetwork.address);
      const contract = new web3.eth.Contract(Vote.abi, deployedNetwork.address);
      //console.log(contract);
      setState({ web3: web3, contract: contract });
    }
    init();
  }, []);
  useEffect(() => {
    const { web3 } = state;
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [state]);
  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;

    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      setAccount(selectedAccountAddress);
    }
  };

  return (
      <>
      
    <div class="topnav">
      <a>
        <Link to="/">Home</Link>
      </a>
      <a>
          <Link to="/candidate">Candidate</Link>
        </a>
        <a>
          <Link to="/voter">Voter</Link>
        </a>
        <a>
          <Link to="/electioncommision">Election Commision</Link>
        </a>
       
        <a><Winner state={state}></Winner></a>

      </div>
      <div className="maiNcontainer" >
        <p  >Connected Account :{account}</p>
        <form  className="label0" id="myForm">
          <label htmlFor=""> Choose an account </label>
        < select  className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option>

          </option>
        </select>
        </form>
       

        <Route path="/candidate">
        <Candidate state={state} account={account}></Candidate>
      </Route>
      <Route path="/voter">
        <VoterRegister state={state} account={account}></VoterRegister>
      </Route>
      <Route path="/electioncommision">
        <ElectionCommision state={state} account={account}></ElectionCommision>
      </Route>

        
      </div>
      </>
  
  
  );
}

export default App;

