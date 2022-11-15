import web3 from "./web3";

const address = "0x77AF9be4d1F8820a20224eB780A1150c00C3cA76";

const abi =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
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
    "inputs": [],
    "name": "donate",
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
        "name": "charity",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "voteType",
        "type": "int256"
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
<<<<<<< HEAD
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]
=======
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "charityAddress",
        type: "address",
      },
    ],
    name: "getPolls",
    outputs: [
      {
        internalType: "uint256[10]",
        name: "",
        type: "uint256[10]",
      },
      {
        internalType: "uint256[10]",
        name: "",
        type: "uint256[10]",
      },
      {
        internalType: "string[10]",
        name: "",
        type: "string[10]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "charityAddress",
        type: "address",
      },
    ],
    name: "getNumPolls",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
>>>>>>> bc4ab9b475b81936cf91bb92035de31044083139

// @ts-ignore
export default new web3.eth.Contract(abi, address);
