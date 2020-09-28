const cgt = artifacts.require("cgt");

contract("cgt", function () {
    it("should assert true", async function () {
        instance = await cgt.deployed();

        Name = await instance.name.call();
        assert.equal(Name, "CURG_Governance_Token", "Name is wrong");

        Symbol = await instance.symbol.call();
        assert.equal(Symbol, "CGT", "Symbol is wrong");

        TotalSupply = await instance.totalSupply.call();
        assert.equal(TotalSupply.toNumber(), 10000, "TotalSupply is wrong");
    });
});
