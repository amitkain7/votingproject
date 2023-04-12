import { Link } from "react-router-dom";
function ElectionCommision({ state, account, selectAccount }) {
  async function voteStart(event) {
    event.preventDefault();
    const { contract } = state;
    const startTime = document.querySelector("#start").value;
    const endTime = document.querySelector("#end").value;
    try {
      await contract.methods.voteTime(startTime, endTime).send({
        from: account,
        gas: "1000000",
      });
      alert("Voting Started");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }
  async function emergency() {
    const { contract } = state;
    try {
      await contract.methods.emergency().send({
        from: account,
        gas: "1000000",
      });
      alert("Emergency Declared");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }
  async function result() {
    const { contract } = state;
    try {
      await contract.methods.result().send({
        from: account,
        gas: "1000000",
      });
      alert("Result declared");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>


      <form className="form" onSubmit={voteStart}>
        <label className="label2"  htmlFor="start">Start Time:</label>
        <input className="innerBoxVote" type="text" id="start"></input>

        <label className="label2"  htmlFor="end">End Time:</label>
        <input  className="innerBoxVote" type="text" id="end"></input>
        <button className="regBtn" type="submit">Voting Start</button>
      </form>
      <button className="emerBtn" onClick={emergency}>Emergency</button><br/>
      <button className="resBtn" onClick={result}>Result</button>
    </div>
  );
}
export default ElectionCommision;
