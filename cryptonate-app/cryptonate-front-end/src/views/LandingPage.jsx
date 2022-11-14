import Web3 from "web3";

import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import NFTContractBuild from "./Cryptonate.json";
import React from "react";

const Login = ({ addAddress }) => {
  const navigate = useNavigate();

  const login = async (role) => {
    try {
      let provider = window.ethereum;
      let selectedAccount;
      if (typeof provider !== "undefined") {
        provider.request({ method: "eth_requestAccounts" }).then((accounts) => {
          selectedAccount = accounts[0];
          console.log(`Selected account is ${selectedAccount}`);
          console.log(role);
          const web3 = new Web3(provider);
          const nftContract = new web3.eth.Contract(
            NFTContractBuild.abi,
            "0xc703115d295A4CA319E8FeCc3f8d107cCb2e0F1A"
          );
          if (role === "donor") {
            const res = nftContract.methods
              .checkValidDonor(selectedAccount)
              .call({ from: selectedAccount });

            const printAddress = async () => {
              const a = await res;
              console.log(a);
              if (a === true) {
                console.log("Successfully logged in !");
              } else {
                console.log("Not registered as Donor");
              }
            };

            printAddress();
          } else {
            const res = nftContract.methods
              .checkValidCharity(selectedAccount)
              .call({ from: selectedAccount });
            const printAddress = async () => {
              const a = await res;
              console.log(a);
              if (a === true) {
                console.log("Successfully logged in !");
              } else {
                console.log("Not registered as Charity");
              }
            };

            printAddress();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ background: "#1F2937" }} height="100vh" width="100vw">
      <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
        <Button
          onClick={() => login("donor")}
          sx={{ color: "#319795", ml: "5px" }}
        >
          Login as Donor
        </Button>
        <Button
          onClick={() => login("charity")}
          sx={{ color: "#319795", ml: "5px" }}
        >
          Login as Charity
        </Button>

        <Button
          variant="contained"
          sx={{ background: "#319795", ml: "10px" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </Box>
      <Box
        display="flex"
        color="white"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1">Cryptonate</Typography>
      </Box>
    </Box>
  );
};

export default Login;
