import { Link } from "react-router-dom";
import CandidateDisplay from "./CandidateDisplay";
import VoterList from "./VoterList";
import Vote from "./Vote";
function VoterRegister({ state, account }) {
  async function register(event) {
    event.preventDefault();
    const { contract } = state;
    // console.log(contract);
    const name = document.querySelector("#name").value;

    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;

    try {
      await contract.methods.voterRegister(name, age, gender).send({
        from: account,
        gas: "1000000",
      });
      alert("Voter Registration Successful");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <div className="btnContainer">

      <form className="form" onSubmit={register}>
        <label className="label2" htmlFor="name">Name:</label>
        <input  className="innerBoxVote" type="text" id="name"></input>

        <label className="label2"  htmlFor="age">Age:</label>
        <input className="innerBoxVote"  type="text" id="age"></input>

        <label className="label2"  htmlFor="gender">Gender:</label>
        <input className="innerBoxVote"  type="text" id="gender"></input>
        <button className="regBtn"  type="submit">Register</button>
        
      </form>
      </div>
       <Vote state={state} account={account}></Vote>
      <div className="voterlist">
       <VoterList state={state}></VoterList>
      </div>
    </div>
  );
}
export default VoterRegister;
