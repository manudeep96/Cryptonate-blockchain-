const Donate = artifacts.require(
  "cryptonate-contract/contracts/Cryptonate.sol"
);

module.exports = function (deployer) {
  deployer.deploy(Donate, "0xe59549A16CE83fdA197e577A29011e7a646D2dda");
};
