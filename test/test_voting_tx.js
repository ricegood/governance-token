const voting = artifacts.require("Voting");

contract("voting", function () {
    it("should assert true", async function () {
        accounts = await web3.eth.getAccounts();
        instance = await voting.deployed();

        Owner = await instance.owner();
        assert.equal(Owner, accounts[0]);

        await instance.mint(accounts[1], 2500, { from: Owner });
        await instance.mint(accounts[2], 3000, { from: Owner });

        await instance.createBallot(
            [
                "0x48656c6c6f000000000000000000000000000000000000000000000000000000",
                "0x576f726c64000000000000000000000000000000000000000000000000000000"
            ],
            { from: accounts[2] }
        );

        await instance.addRightToVote(
            0,
            accounts[1],
            2000,
            { from: accounts[0] }
        );
        Balance = await instance.balanceOf.call(accounts[1]);
        assert.equal(Balance.toNumber(), 500, "Balance is wrong");

        await instance.vote(
            0,
            1,
            { from: accounts[1] }
        );
        Balance = await instance.balanceOf.call(accounts[1]);
        assert.equal(Balance.toNumber(), 500, "Balance is wrong");

        WiningProposal = await instance.winningProposal(
            0,
            { from: accounts[1] }
        );
        assert.equal(WiningProposal.toNumber(), 1, "Voting system is wrong");

        BallotCount = await instance.LengthOfBallots.call();
        assert.equal(BallotCount.toNumber(), 1, "Number of Ballots are wrong");
        BallotCount = await instance.LengthOfBallots.call();

        ProposalCount = await instance.getterProposals.call(0, 1);
        assert.equal(ProposalCount[1].toNumber(), 44, "A Total Number of proposal is wrong");
    });
});
