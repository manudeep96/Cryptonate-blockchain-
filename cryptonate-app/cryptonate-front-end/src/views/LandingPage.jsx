import Web3 from "web3";

import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = ({ addAddress }) => {
  const navigate = useNavigate();
  const login = async () => {
    try {
      if (window?.ethereum?.isMetaMask) {
        // Desktop browser
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = Web3.utils.toChecksumAddress(accounts[0]);
        addAddress(account);
        console.log("account", account);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ background: "#1F2937" }} height="100vh" width="100vw">
      <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
        <Button onClick={() => login()}>Login</Button>
        <Button
          variant="contained"
          sx={{ background: "#319795", ml: "5px" }}
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
