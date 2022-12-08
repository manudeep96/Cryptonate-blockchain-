import web3 from "./web3";

const address = "0xB5F1D56024dbaE07c60306e6481cA993709514A0";

const abi =    [
    {
      "inputs": [
        {
          "internalType": "contract Faunacoin",
          "name": "faunacoinAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "fc_ref",
      "outputs": [
        {
          "internalType": "contract Faunacoin",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "donorAddr",
          "type": "address"
        }
      ],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "donorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mintTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "registerCharity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "registerDonor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "charityAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "registerDonation",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expenseType",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "requestFunds",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "pollId",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "charityAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "voteType",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "key",
          "type": "address"
        }
      ],
      "name": "checkValidDonor",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "key",
          "type": "address"
        }
      ],
      "name": "checkValidCharity",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "charityAddress",
          "type": "address"
        }
      ],
      "name": "getPolls",
      "outputs": [
        {
          "internalType": "uint256[10]",
          "name": "",
          "type": "uint256[10]"
        },
        {
          "internalType": "uint256[10]",
          "name": "",
          "type": "uint256[10]"
        },
        {
          "internalType": "string[10]",
          "name": "",
          "type": "string[10]"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getCharities",
      "outputs": [
        {
          "internalType": "string[10]",
          "name": "",
          "type": "string[10]"
        },
        {
          "internalType": "string[10]",
          "name": "",
          "type": "string[10]"
        },
        {
          "internalType": "address[10]",
          "name": "",
          "type": "address[10]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "charityAddress",
          "type": "address"
        }
      ],
      "name": "getDonations",
      "outputs": [
        {
          "internalType": "address[100]",
          "name": "",
          "type": "address[100]"
        },
        {
          "internalType": "uint256[100]",
          "name": "",
          "type": "uint256[100]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "charityAddress",
          "type": "address"
        }
      ],
      "name": "getWithdrawals",
      "outputs": [
        {
          "internalType": "string[100]",
          "name": "",
          "type": "string[100]"
        },
        {
          "internalType": "uint256[100]",
          "name": "",
          "type": "uint256[100]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "charityAddress",
          "type": "address"
        }
      ],
      "name": "getNumPolls",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

// @ts-ignore
export default new web3.eth.Contract(abi, address);
