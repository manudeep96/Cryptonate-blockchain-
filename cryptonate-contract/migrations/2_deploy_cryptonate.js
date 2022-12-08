const Donate = artifacts.require(
  "cryptonate-contract/contracts/Cryptonate.sol"
);

const FC = artifacts.require("cryptonate-contract/contracts/faunacoin.sol");

module.exports = function (deployer) {
  deployer.deploy(Donate, "0xD21ea8d841608F60EEe1e19052FF2AFEd7D07834");
};

// module.exports = function (deployer) {
//   deployer.deploy(FC);
// };
