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
import cryptonateSC from "../cryptonate";
const LandingPage = () => {
  const navigate = useNavigate();
  const [signupAsCharity, setSignupAsCharity] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [accounts, setAccount] = useState('');

  const signup = async () => {
    let provider = window.ethereum;
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    const selectedAccount = accounts[0];
    let sent;
    if (signupAsCharity) {
      sent = await cryptonateSC.methods
        .registerCharity(name, description)
        .send({ from: selectedAccount });
    } else {
      sent = await cryptonateSC.methods
        .registerDonor()
        .send({ from: selectedAccount });
    }

    console.log("sent", sent);
    // Take the user to landing page again
    navigate("/");
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
