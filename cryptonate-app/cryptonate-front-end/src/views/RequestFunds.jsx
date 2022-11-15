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
  const [expenseType, setExpenseType] = useState("opex");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const requestFunds = async (amount, description, expenseType) => {
    let et = expenseType === "Opex" ? 0 : 1;
    try {
      console.log("Calling smartcontract ");
      let provider = window.ethereum;
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      let res = await cryptonateSC.methods
        .requestFunds(amount + "", et, description)
        .send({
          from: selectedAccount,
        });
      console.log("Request successful", res);
    } catch (error) {
      console.log("Error", error);
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
        <TextField
          id="outlined-basic"
          label="Amount (ETH)"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Box>
          <Button
            color="success"
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={() => requestFunds(amount + 0, description, expenseType)}
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
