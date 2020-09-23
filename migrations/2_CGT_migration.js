const cgt = artifacts.require("cgt");

const _name = "CURG_Governance_Token";
const _symbol = "CGT";
const initialAccount = "0xfA3929ffCaEC1aD9D714C458768A3b8d7ae5EA13";
const _initialBalance = 10000;

module.exports = function (deployer) {
  deployer.deploy(cgt, _name, _symbol, initialAccount, _initialBalance);
};
