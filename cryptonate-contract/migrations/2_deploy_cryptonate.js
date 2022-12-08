const Donate = artifacts.require(
  "cryptonate-contract/contracts/Cryptonate.sol"
);

const FC = artifacts.require("cryptonate-contract/contracts/faunacoin.sol");

module.exports = function (deployer) {
  deployer.deploy(Donate, "0x4989D6d0171212f7C88E29A8F4a1B0C967d094a1");
};

// module.exports = function (deployer) {
//   deployer.deploy(FC);
// };
