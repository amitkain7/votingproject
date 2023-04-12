import { useEffect, useState } from "react";
function Vote({ state, account }) {
  const [status, setStatus] = useState("Not Started");
  useEffect(() => {
    const { contract } = state;

    async function statusVoting() {
      const status = await contract.methods.votingStatus().call();
      setStatus(status);
    }
    contract && statusVoting();
  }, [state]);
  async function vote(event) {
    event.preventDefault();
    const { contract } = state;
    const voterId = document.querySelector("#voterId").value;
    const candidateId = document.querySelector("#candidateId").value;
    try {
      await contract.methods.vote(voterId, candidateId).send({ from: account });
      alert("Voting Done");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div>
      <form className="form" onSubmit={vote}>
        <label className="label2" htmlFor="voterId">VoterId:</label>
        <input  className="innerBoxVote"type="text" id="voterId"></input>

        <label  className="label2" htmlFor="candidateId">Candidate Id:</label>
        <input className="innerBoxVote" type="text" id="candidateId"></input>
        <button className="regBtn" type="submit">Vote</button>
      </form>
      <p>Voting Status:{status}</p>
    </div>
  );
}
export default Vote;
