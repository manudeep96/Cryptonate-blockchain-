import { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import NFTContractBuild from './Cryptonate.json';

const LandingPage = () => {
    const navigate = useNavigate();
    const [signupAsCharity, setSignupAsCharity] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    // const [accounts, setAccount] = useState('');
    
    
    // Displays a prompt for the user to select which accounts to connect
    async function requestAccount() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // setAccount(account[0]);
    }
  
  const signup = async () => {
    console.log("Signing up");
    // Call sc
    requestAccount();

    let provider = window.ethereum;
    let selectedAccount;
    provider
        .request({method: 'eth_requestAccounts' })
        .then((accounts) => {
          selectedAccount = accounts[0];
          const web3 = new Web3(provider);
          const nftContract = new web3.eth.Contract(NFTContractBuild.abi,'0xc703115d295A4CA319E8FeCc3f8d107cCb2e0F1A');
          const sent = signupAsCharity ? nftContract.methods.registerCharity(selectedAccount).send({from: selectedAccount}) : nftContract.methods.registerDonor(selectedAccount).send({from: selectedAccount}) ;
          console.log("yesss",sent);
          console.log("account", name);
          // Take the user to landing page again
          navigate("/");
        });
  };

  const handleCheckboxChange = (e) => {
    e.target.value === "charity"
      ? setSignupAsCharity(true)
      : setSignupAsCharity(false);
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box
        display="flex"
        sx={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
        height="100vh"
      >
        <Stack spacing={4} width="50%">
          <Typography variant="h3">Register</Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={signupAsCharity ? "charity" : "donor"}
            onChange={handleCheckboxChange}
            row
          >
            <FormControlLabel
              value="donor"
              control={<Radio />}
              label="As a Donor"
            />
            <FormControlLabel
              value="charity"
              control={<Radio />}
              label="As a Charity"
            />
          </RadioGroup>
          <TextField
            id="outlined-basic"
            label={signupAsCharity ? "Charity name" : "Name"}
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {signupAsCharity && (
            <TextField
              gutterBottom
              id="outlined-basic"
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
          <Box>
            <Button variant="contained" size="large" onClick={() => signup()}>
              Sign up
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default LandingPage;
