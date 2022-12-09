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

<<<<<<< HEAD
module.exports = function(deployer) {
  deployer.deploy(Coin).then(function() {
    return deployer.deploy(Donate, Coin.address);
  });
=======
module.exports = function (deployer) {
  deployer.deploy(Donate, "0x4989D6d0171212f7C88E29A8F4a1B0C967d094a1");
>>>>>>> 6ff9f1677b8e3d6a2a880935bb646121f463d539
};

// module.exports = function (deployer) {
//   deployer.deploy(FC);
// };
