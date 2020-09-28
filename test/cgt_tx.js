const cgt = artifacts.require("cgt");

contract("cgt", function () {
    it("should assert true", async function () {
        accounts = await web3.eth.getAccounts();
        instance = await cgt.deployed();

        Owner = await instance.owner();
        assert.equal(Owner, accounts[0]);

        await instance.mint(accounts[1], 2000, {
            from: Owner,
        });

        Balance = await instance.balanceOf.call(accounts[1]);
        assert.equal(Balance.toNumber(), 2000, "Balance is wrong");

        await instance.mint(accounts[2], 3000, {
            from: Owner,
        });

        Balance = await instance.balanceOf.call(accounts[2]);
        assert.equal(Balance.toNumber(), 3000, "Balance is wrong");

        TotalSupply = await instance.totalSupply.call();
        assert.equal(TotalSupply.toNumber(), 15000, "TotalSupply is wrong");

        await instance.transfer(
            accounts[1],
            500, {
            from: accounts[2],
        }
        );

        Balance = await instance.balanceOf.call(accounts[1]);
        assert.equal(Balance.toNumber(), 2500, "Balance is wrong");

        Balance = await instance.balanceOf.call(accounts[2]);
        assert.equal(Balance.toNumber(), 2500, "Balance is wrong");
    });
});
