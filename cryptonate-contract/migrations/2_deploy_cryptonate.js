const Donate = artifacts.require(
  "cryptonate-contract/contracts/Cryptonate.sol"
);

const FC = artifacts.require("cryptonate-contract/contracts/faunacoin.sol");

module.exports = function (deployer) {
  deployer.deploy(Donate, "0x8686bA925ea3CB9d6aAb6BF3893b4d0f0A26576c");
};

// module.exports = function (deployer) {
//   deployer.deploy(FC);
// };
