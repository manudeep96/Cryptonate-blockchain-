const Donate = artifacts.require(
  "cryptonate-contract/contracts/Cryptonate.sol"
);

const Coin = artifacts.require(
  "cryptonate-contract/contracts/Faunacoin.sol"
);

// module.exports = function (deployer) {
//   deployer.deploy(Coin);
//   const faunacoinAddress = Coin.address;
//   deployer.deploy(Donate,faunacoinAddress);
// };

module.exports = function(deployer) {
  deployer.deploy(Coin).then(function() {
    return deployer.deploy(Donate, Coin.address);
  });
};

// module.exports = function (deployer) {
//   deployer.deploy(FC);
// };
