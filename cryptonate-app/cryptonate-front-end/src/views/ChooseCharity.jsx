import { Box, Typography, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { Navigate, useNavigate } from "react-router-dom";

const ChooseCharity = () => {
  const navigate = useNavigate();
  const chooseCharity = () => {
    console.log("calling smart contract");
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
      <Typography variant="subtitle1" gutterBottom>
        Previously donated
      </Typography>
      <Stack spacing={4} sx={{ marginBottom: 5 }}>
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
      </Stack>
      <Typography variant="subtitle1" gutterBottom>
        Explore new charities
      </Typography>
      <Stack spacing={4}>
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
      </Stack>
    </Box>
  );
};

export default ChooseCharity;
