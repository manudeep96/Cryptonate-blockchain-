const Donate = artifacts.require(
  "cryptonate-contract/contracts/Cryptonate.sol"
);

module.exports = function (deployer) {
  deployer.deploy(Donate);
};
