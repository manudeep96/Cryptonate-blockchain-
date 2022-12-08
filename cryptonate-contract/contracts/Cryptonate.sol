// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 ;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "./faunacoin.sol";

contract Cryptonate {
    ///////////////////////// ALL STORAGE VARIABLES
    // address fcAddr = 0xd9145CCE52D386f254917e481eB44e9943F39138;

    Faunacoin public fc_ref;

    constructor(Faunacoin faunacoinAddress) {
        fc_ref = faunacoinAddress;
    }

    address payable cryptonateOwner;

    // Holds details of each poll
    struct Poll {
        uint256 pollId;
        string description;
        uint256 approved;
        uint256 disapproved;
        uint256 state;
        uint256 amount;
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
    
    struct Donations {
        address donorAddress;
        uint256 amount;
    }

    // Hold donations for each charity
    mapping(address => Donations[]) allDonations;

    struct Withdrawals {
        string expenseType;
        string purpose;
        uint256 amount;
    }
    mapping(address => Withdrawals[]) allWithdrawals;

    address[10] charityAddresses;

    uint256 charityCount = 0;

    // Hold details of a donor
    struct Donor {
        address _donor;
        mapping(address => bool) charities;
    }

    // Hold all donors
    mapping(address => Donor) allDonors;

    ///////////////////////// MODIFIERS

    modifier validateRequest(address sender, uint256 amount) {
        require(
            allCharities[sender].funds > amount,
            "Not enough funds in the purse"
        );
        _;
    }

    ///////////////////////// INIT FUNCTIONS
    function getBalance(address donorAddr) public view returns (uint256) {
        return fc_ref.balanceOf(donorAddr);
    }

    function mintTokens(address donorAddr, uint256 amount) public {
        fc_ref.mint(donorAddr, amount);
    }

    function totalSupply() public view returns (uint256) {
        return fc_ref.totalSupply();
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

        charityAddresses[charityCount] = payable(msg.sender);
        charityCount += 1;
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

        // Add amount to charity's purse
        Charity storage c = allCharities[charityAddress];
        c.funds += amount;
        allDonations[charityAddress].push(Donations(msg.sender,amount/1000000000000000000));
        // This is to check if the donor should be allowed to respond to a poll by this charity
        if (d.charities[charityAddress] == false) {
            d.charities[charityAddress] = true;
            c.numDonors += 1;
        }

        //TODO: Send tokens to the donor

        // Give tokens to the donor
        mintTokens(msg.sender, amount / 1000000000000000000);
    }

    // Create a new poll or transfer funds in case of opex
    function requestFunds(
        uint256 amount,
        uint256 expenseType,
        string calldata description
    ) public payable validateRequest(msg.sender, amount) {
        if (expenseType == 0) {
            // Send funds
            payable(msg.sender).transfer(amount * 1000000000000000000);
            
            allWithdrawals[msg.sender].push(Withdrawals("Operational Expense",description,amount));
        } else {
            Charity storage c = allCharities[msg.sender];
            c.polls[c.numPolls].pollId = c.numPolls;
            c.polls[c.numPolls].description = description;
            c.polls[c.numPolls].approved = 0;
            c.polls[c.numPolls].disapproved = 0;
            c.polls[c.numPolls].state = 0;
            c.polls[c.numPolls].amount = amount;
            c.numPolls++;
        }
    }

    // Register donor's vote
    function vote(
        uint256 pollId,
        address payable charityAddress,
        uint256 voteType
    ) public {
        // Add user's vote
        Charity storage c = allCharities[charityAddress];
        // Check if this donor has donated to this charity
        require(allDonors[msg.sender].charities[charityAddress] == true);

        // TODO: Get the donors token balance to decide the weight of their vote.
        // TODO: Change
        uint256 balance = getBalance(msg.sender);

        if (voteType == 1) {
            c.polls[pollId].approved += balance;
        } else {
            c.polls[pollId].disapproved += balance;
        }
        if (
            c.polls[pollId].approved + c.polls[pollId].disapproved >=
            (totalSupply() * 75) / 100
        ) {
            c.polls[pollId].state = 1;
            payable(charityAddress).transfer(
                c.polls[pollId].amount * 1000000000000000000
            );
            allWithdrawals[charityAddress].push(Withdrawals("Capital Expense",c.polls[pollId].description,c.polls[pollId].amount));
        }
    }

    // User login
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

    // Get last 10 polls of an organization with description, approved and disapproved vote counts
    function getPolls(address charityAddress)
        public
        view
        returns (
            uint256[10] memory,
            uint256[10] memory,
            string[10] memory,
            uint256
        )
    {
        Charity storage c = allCharities[charityAddress];
        uint256[10] memory approved;
        uint256[10] memory disapproved;
        string[10] memory descriptions;
        uint256 total;

        for (uint256 i = 0; i < 10; i++) {
            approved[i] = c.polls[i].approved;
            disapproved[i] = c.polls[i].disapproved;
            total = totalSupply();

            descriptions[i] = c.polls[i].description;
        }
        return (approved, disapproved, descriptions, total);
    }

    function getCharities()
        public
        view
        returns (
            string[10] memory,
            string[10] memory,
            address[10] memory
        )
    {
        string[10] memory names;
        string[10] memory descs;
        address[10] memory addrs;
        mapping(address => Charity) storage ac = allCharities;
        for (uint256 i = 0; i < 10; i++) {
            names[i] = ac[charityAddresses[i]].name;
            descs[i] = ac[charityAddresses[i]].description;
            addrs[i] = charityAddresses[i];
        }

        return (names, descs, addrs);
    }

    function getDonations(address charityAddress)
        public
        view
        returns (
            address[100] memory,
            uint256[100] memory

        )
    {
        address[100] memory donors;
        uint256[100] memory amounts;
        for (uint256 i = 0; i < allDonations[charityAddress].length; i++) {
            donors[i] = allDonations[charityAddress][i].donorAddress;
            amounts[i] = allDonations[charityAddress][i].amount;
        }
        return (donors,amounts);
    }

    function getWithdrawals(address charityAddress)
        public
        view
        returns (
            string[100] memory,
            uint256[100] memory

        )
    {
        string[100] memory expenseType;
        uint256[100] memory amounts;
        for (uint256 i = 0; i < allWithdrawals[charityAddress].length; i++) {
            expenseType[i] = allWithdrawals[charityAddress][i].expenseType;
            amounts[i] = allWithdrawals[charityAddress][i].amount;
        }
        return (expenseType,amounts);
    }

    // Get the current number of polls of a given organisation
    function getNumPolls(address charityAddress) public view returns (uint256) {
        Charity storage c = allCharities[charityAddress];
        return c.numPolls;
    }
}
