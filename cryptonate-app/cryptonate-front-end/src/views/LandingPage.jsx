import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import React from "react";
import cryptonateSC from "../cryptonate";

const Login = ({ addAddress }) => {
  const navigate = useNavigate();

  const login = async (role) => {
    try {
      let provider = window.ethereum;
      let selectedAccount;
      if (typeof provider !== "undefined") {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
        console.log(role);

        if (role === "donor") {
          const res = await cryptonateSC.methods
            .checkValidDonor(selectedAccount)
            .call({ from: selectedAccount });

          if (res === true) {
            console.log("Successfully logged in !");
            addAddress(selectedAccount, role);
          } else {
            console.log("Not registered as Donor");
          }
        } else {
          const res = await cryptonateSC.methods
            .checkValidCharity(selectedAccount)
            .call({ from: selectedAccount });

          if (res === true) {
            console.log("Successfully logged in !");
            addAddress(selectedAccount, role);
          } else {
            console.log("Not registered as Charity");
          }
        }
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
