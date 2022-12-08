import { Box, Typography, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cryptonateSC from "../cryptonate";

const ChooseCharity = ({ addCharityAddress }) => {
  const navigate = useNavigate();
  const [allCharities, setAllCharities] = useState();

  useEffect(() => {
    const getCharites = async () => {
      try {
        let provider = window.ethereum;
        let selectedAccount;
        if (typeof provider !== "undefined") {
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          selectedAccount = accounts[0];

          const res = await cryptonateSC.methods
            .getCharities()
            .call({ from: selectedAccount });
          setAllCharities(res);
          console.log("All charities::", res);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    getCharites();
  }, []);

  const chooseCharity = (addr) => {
    addCharityAddress(addr);
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "#1F2937",
        color: "white",
        position: "absolute",
        top: 0,
        left: 0,
        padding: "50px",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Choose a charity
      </Typography>
      {/* <Typography variant="subtitle1" gutterBottom>
        Previously donated
      </Typography> */}
      <Stack spacing={4} sx={{ marginBottom: 5 }}>
        {allCharities &&
          allCharities[0].map(
            (name, i) =>
              name !== "" && (
                <Paper
                  onClick={() => chooseCharity(allCharities[2][i])}
                  sx={{
                    width: "600px",
                    height: "150px",
                    cursor: "pointer",
                    padding: 3,
                    background: "#2D3748",
                    color: "white",
                  }}
                  elevation={2}
                >
                  <Typography variant="h5">{name}</Typography>
                  <Typography variant="subtitle1">
                    {allCharities[1][i]}
                  </Typography>
                </Paper>
              )
          )}
      </Stack>
      {/* <Typography variant="subtitle1" gutterBottom>
        Explore new charities
      </Typography> */}
      {/* <Stack spacing={4}>
        <Paper
          onClick={() => chooseCharity()}
          sx={{
            width: "600px",
            height: "150px",
            cursor: "pointer",
            padding: 3,
            background: "#2D3748",
            color: "white",
          }}
          elevation={2}
        >
          <Typography variant="h5">Humans for Animals</Typography>
          <Typography variant="subtitle1">Humans for Animals</Typography>
        </Paper>
      </Stack> */}
    </Box>
  );
};

export default ChooseCharity;
