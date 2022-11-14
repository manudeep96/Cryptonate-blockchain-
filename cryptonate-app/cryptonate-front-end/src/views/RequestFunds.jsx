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
import { useState, useEffect } from "react";
import PageHeading from "../common/PageHeading";
import cryptonateSC from "../cryptonate";

const RequestFunds = () => {
  const [expenseType, setExpenseType] = useState("Opex");
  const [description, setDescription] = useState("");

  const requestFunds = async (description, expenseType) => {
    console.log("Calling smartcontract ");
    if(expenseType === 'opex'){
      let provider = window.ethereum;
      let selectedAccount;
      const accounts =  await provider.request({ method: "eth_requestAccounts" });
      selectedAccount = accounts[0];
      console.log(selectedAccount)
      let sent;
      // await cryptonateSC.methods.donate().send({from: selectedAccount,value:10});
      sent = await cryptonateSC.methods
          .requestFunds(5,0,'fdsfs')
          .send({ from: selectedAccount});
      console.log('Called SC method')
      
    }
  };

  return (
    <Box>
      <PageHeading
        title="Request funds"
        subtitle="Raise a request to meet any expenses of the charity"
      />
      <Stack spacing={4}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          value={expenseType}
          onChange={(e) => setExpenseType(e.target.value)}
          row
        >
          <FormControlLabel
            value="opex"
            control={<Radio />}
            label="Opex (day to day expenses)"
          />
          <FormControlLabel
            value="capex"
            control={<Radio />}
            label="Capex (One time request that needs to be approved by donors)"
          />
        </RadioGroup>
        <TextField
          id="outlined-basic"
          label="Describe the expenditure"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box>
          <Button
            color="success"
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={() => requestFunds(description, expenseType)}
          >
            Request
          </Button>
          <Button color="info" onClick={() => setDescription("")}>
            Cancel
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default RequestFunds;
