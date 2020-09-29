const voting = artifacts.require("voting");

contract("voting", function () {
    it("should assert true", async function () {
        instance = await voting.deployed();

        Name = await instance.name.call();
        assert.equal(Name, "CURG_Governance_Token", "Name is wrong");

        Symbol = await instance.symbol.call();
        assert.equal(Symbol, "CGT", "Symbol is wrong");

        TotalSupply = await instance.totalSupply.call();
        assert.equal(TotalSupply.toNumber(), 10000, "TotalSupply is wrong");
    });
});
