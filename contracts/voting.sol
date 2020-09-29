pragma solidity ^0.6.0;

import './cgt.sol';

contract Voting is CGT{

    struct Voter {
        uint    weight;     // weight is accumulated by delegation
        bool    voted;      // if true, that person already voted
        uint    vote;       // index of the voted proposal
    }

    struct Proposal {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;       // short name (up to 32 bytes)
        uint    voteCount;  // number of accumulated votes
    }

    struct Ballot {
        Proposal[]                      proposals;
        mapping(address => Voter)       voters;
    }

    Ballot[] ballots;

    constructor (
        string memory name,
        string memory symbol,
        uint256 initialBalance
    ) public payable CGT(name, symbol, initialBalance) {
        // ...
    }

    function createBallot(bytes32[] memory proposalNames) public {
        ballots.push();
        Ballot storage ballot = ballots[ballots.length - 1];

        // Default value is zero-indexed proposal (pre-voted) .
        for (uint i = 0; i < proposalNames.length; i++) {
            ballot.proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function addRightToVote(uint ballotNum, address voter, uint amount) public onlyOwner {        
        Ballot storage ballot = ballots[ballotNum];

        // Should be able to vote once only for QV.
        require(!ballot.voters[voter].voted, "The voter already voted.");

        burn(voter, amount);
        ballot.voters[voter].weight += amount;
    }

    function vote(uint ballotNum, uint proposal) public {
        Ballot storage ballot = ballots[ballotNum];
        Voter storage sender = ballot.voters[msg.sender];

        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all changes.
        // ballots[ballot].proposals[proposal].voteCount += sender.weight;
        
        // Quadratic Voting
        ballot.proposals[proposal].voteCount += _sqrt(sender.weight);
    }

    function LengthOfBallots() public view returns (uint length_) {
        length_ = ballots.length;
    }

    function LengthOfProposals(uint ballotNum) public view returns (uint length_) {
        length_ = ballots[ballotNum].proposals.length;
    }

    function getterProposals(uint ballotNum, uint proposalNum) public view
            returns (bytes32 name_, uint voteCount_)
    {
        Proposal storage proposal = ballots[ballotNum].proposals[proposalNum];
        name_ = proposal.name;
        voteCount_ = proposal.voteCount;
    }

    function getterVoters(uint ballotNum, address voterNum) public view
            returns (uint weight_, bool voted_, uint vote_)
    {
        Voter storage voter = ballots[ballotNum].voters[voterNum];
        weight_ = voter.weight;
        voted_ = voter.voted;
        vote_ = voter.vote;
    }

    function winningProposal(uint ballotNum) public view
            returns (uint winningProposal_)
    {
        Ballot storage ballot = ballots[ballotNum];

        uint winningVoteCount = 0;
        for (uint p = 0; p < ballot.proposals.length; p++) {
            if (ballot.proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = ballot.proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName(uint ballotNum) public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = ballots[ballotNum].proposals[winningProposal(ballotNum)].name;
    }

    function _sqrt(uint x) internal pure
            returns (uint y)
    {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    // https://blockchangers.github.io/solidity-converter-online/
    function stringToBytes32(string memory source) public pure
            returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) { return 0x0; }
        assembly { result := mload(add(source, 32)) }
    }
}
