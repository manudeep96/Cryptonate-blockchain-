// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22;

contract Cryptonate {
    address payable cryptonateOwner;
    address[] donors;
    uint totalDonationAmount;

    modifier validateDonation(uint amount) {
        require(amount > 0, 'Donation Amount needs to be more than 0');
        _;
    }
    struct Donation{
        address _donor;
        uint donationAmount;
    }

    
    mapping(address => uint) public _allCharities;

    function registerCharity(address charityAddress) public{
        _allCharities[charityAddress] = 0;
    }
    function donate(address charityAddress,uint donationAmount) public payable validateDonation(donationAmount){
        _allCharities[charityAddress] += donationAmount ;
        donors.push(msg.sender);
    }

    function getDonors() public view returns (address[] memory) {
      return donors;
    }
    
}