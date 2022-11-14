import { Typography, Box, TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import PageHeading from "../common/PageHeading";

const RequestFunds = () => {
  const [amount, setAmount] = useState("");

  const requestFunds = (amount) => {
    console.log("Calling smartcontract ");
  };

  return (
    <Box>
      <PageHeading title="Donate" subtitle="Donate money to the charity" />
      <Stack spacing={4} width="500px">
        <TextField
          id="outlined-basic"
          label="Amount (USD)"
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
            onClick={() => requestFunds(amount)}
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
