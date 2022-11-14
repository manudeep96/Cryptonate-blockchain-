// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Cryptonate {
    address payable cryptonateOwner;

    // Holds details of each poll
    struct Poll {
        uint256 pollId;
        string description;
        int256 approved;
        int256 disapproved;
    }

    // Hold details of a single charity
    struct Charity {
        address payable _charity;
        string name;
        string description;
        uint256 funds;
        uint256 numPolls;
        mapping(uint256 => Poll) polls;
    }

    // Hold details of all charities
    mapping(address => Charity) allCharities;

    // Hold details of a donor
    struct Donor {
        address _donor;
        mapping(address => bool) charities;
    }

    // Hold all donors
    mapping(address => Donor) allDonors;

    modifier validateRequest(address sender, uint256 amount) {
        require(
            allCharities[sender].funds > amount,
            "Not enough funds in the purse"
        );
        _;
    }

    // Register a charity
    function registerCharity(string calldata name, string calldata description)
        public
    {
        Charity storage c = allCharities[payable(msg.sender)];
        c._charity = payable(msg.sender);
        c.name = name;
        c.description = description;
        c.funds = 0;
        c.numPolls = 0;
    }

    // Register a donor
    function registerDonor() public {
        Donor storage d = allDonors[msg.sender];
        d._donor = msg.sender;
    }

    function registerDonation(address charityAddress, uint256 amount)
        public
        payable
    {
        require(msg.value == amount && amount > 0);

        // Add charity to the donor's list
        Donor storage d = allDonors[msg.sender];
        // This is to check if the donor should be allowed to respond to a poll by this charity
        d.charities[charityAddress] = true;

        // Add amount to charity's purse
        Charity storage c = allCharities[charityAddress];
        c.funds += amount;
    }

    // Transfer funds both opex and capex
    function requestFunds(
        uint256 amount,
        uint256 expenseType,
        string calldata description
    ) public payable validateRequest(msg.sender, amount) {
        if (expenseType == 0) {
            // Send funds
            payable(msg.sender).transfer(amount);
        } else {
            Charity storage c = allCharities[msg.sender];
            c.numPolls++;
            Poll storage p = c.polls[c.numPolls];
            p.pollId = c.numPolls;
            p.description = description;
        }
    }

    function vote(
        uint256 pollId,
        address payable charity,
        int256 voteType
    ) public {
        // Add user's vote
        Charity storage c = allCharities[charity];
        if (voteType == 1) {
            c.polls[pollId].approved++;
        } else {
            c.polls[pollId].disapproved++;
        }
    }

    function checkValidDonor(address key) public view returns (bool) {
        if (allDonors[key]._donor == key) {
            return true;
        } else {
            return false;
        }
    }

    function checkValidCharity(address key) public view returns (bool) {
        if (allCharities[key]._charity == key) {
            return true;
        } else {
            return false;
        }
    }
}
