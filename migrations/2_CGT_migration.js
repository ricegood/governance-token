const cgt = artifacts.require("CGT");

const _name = "CURG_Governance_Token";
const _symbol = "CGT";
const _initialBalance = 10000;

module.exports = function (deployer) {
  deployer.deploy(cgt, _name, _symbol, _initialBalance);
};
