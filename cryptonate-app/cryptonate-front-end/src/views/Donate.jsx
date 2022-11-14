import { Box, TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import PageHeading from "../common/PageHeading";
import cryptonateSC from "../cryptonate";

const RequestFunds = ({ charityAddress }) => {
  const [amount, setAmount] = useState("");

  const donate = async (amount) => {
    try {
      console.log("Calling smartcontract to donate", amount);
      let provider = window.ethereum;
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      let res = await cryptonateSC.methods
        .registerDonation(charityAddress, amount * 1000000000000000000 + "")
        .send({
          from: selectedAccount,
          value: amount * 1000000000000000000 + "",
        });
      console.log(res);
    } catch (error) {
      console.log("Error donating", error);
    }
  };

  return (
    <Box>
      <PageHeading title="Donate" subtitle="Donate money to the charity" />
      <Stack spacing={4} width="500px">
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
            onClick={() => donate(amount)}
          >
            Donate
          </Button>
          <Button color="info" onClick={() => setAmount("")}>
            Cancel
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default RequestFunds;
