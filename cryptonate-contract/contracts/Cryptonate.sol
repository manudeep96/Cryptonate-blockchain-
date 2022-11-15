// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Cryptonate {
    address payable cryptonateOwner;

    // Holds details of each poll
    struct Poll {
        uint256 pollId;
        string description;
        uint256 approved;
        uint256 disapproved;
        uint256 state;
    }

    // Hold details of a single charity
    struct Charity {
        address payable _charity;
        string name;
        string description;
        uint256 funds;
        uint256 numPolls;
        uint256 numDonors;
        mapping(uint256 => Poll) polls;
    }

    // Hold details of all charities
    mapping(address => Charity) allCharities;
    
    address[] allCharityList;
    // Hold details of a donor
    struct Donor {
        address _donor;
        address[] donatedCharities;
        address[] otherCharities;
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
        c.numDonors = 0;
        c.numPolls = 0;
        allCharityList.push(msg.sender);
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
<<<<<<< HEAD
        // This is to check if the donor should be allowed to respond to a poll by this charity
        d.charities[charityAddress] = true;
        d.donatedCharities.push(charityAddress);
        
=======

>>>>>>> bc4ab9b475b81936cf91bb92035de31044083139
        // Add amount to charity's purse
        Charity storage c = allCharities[charityAddress];
        c.funds += amount;

        // This is to check if the donor should be allowed to respond to a poll by this charity
        if (d.charities[charityAddress] == false) {
            d.charities[charityAddress] = true;
            c.numDonors += 1;
        }
    }

    
    // Transfer funds both opex and capex
    function requestFunds(
        uint256 amount,
        uint256 expenseType,
        string calldata description
    ) public payable {
        if (expenseType == 0) {
            // Send funds
<<<<<<< HEAD
            payable(msg.sender).transfer(amount);
            
=======
            payable(msg.sender).transfer(amount * 1000000000000000000);
>>>>>>> bc4ab9b475b81936cf91bb92035de31044083139
        } else {
            Charity storage c = allCharities[msg.sender];
            c.polls[c.numPolls].pollId = c.numPolls;
            c.polls[c.numPolls].description = description;
            c.polls[c.numPolls].approved = 0;
            c.polls[c.numPolls].disapproved = 0;
            c.polls[c.numPolls].state = 0;
            c.numPolls++;
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
        if (
            c.polls[pollId].approved + c.polls[pollId].disapproved >=
            c.numDonors
        ) {
            c.polls[pollId].state = 1;
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

    string[] nameDonated;
    string[] descDonated;
    
    function getDonatedCharities() public returns (address[] memory,string[] memory,string[] memory) {
        

        for(uint i=0;i<allDonors[msg.sender].donatedCharities.length;i++){
            nameDonated.push(allCharities[allDonors[msg.sender].donatedCharities[i]].name);
            descDonated.push(allCharities[allDonors[msg.sender].donatedCharities[i]].description);
        }
        return(allDonors[msg.sender].donatedCharities,nameDonated,descDonated);
    }

    string[] nameAll;
    string[] descAll;
    function getAllCharities() public returns (address[] memory,string[] memory,string[] memory) {
        

        for(uint i=0;i<allCharityList.length;i++){
            nameAll.push(allCharities[allCharityList[i]].name);
            descAll.push(allCharities[allCharityList[i]].description);
        }
        return(allDonors[msg.sender].donatedCharities,nameAll,descAll);
    }
    
    function getPolls(address charityAddress)
        public
        view
        returns (
            uint256[10] memory,
            uint256[10] memory,
            string[10] memory
        )
    {
        Charity storage c = allCharities[charityAddress];
        uint256[10] memory approved;
        uint256[10] memory disapproved;
        string[10] memory descriptions;

        for (uint256 i = 0; i < 10; i++) {
            if (c.polls[i].state == 0) {
                approved[i] = 0;
            } else {
                approved[i] = c.polls[i].approved;
                disapproved[i] = c.polls[i].disapproved;
            }
            descriptions[i] = c.polls[i].description;
        }
        return (approved, disapproved, descriptions);
    }

    function getNumPolls(address charityAddress) public view returns (uint256) {
        Charity storage c = allCharities[charityAddress];
        return c.numPolls;
    }
}
