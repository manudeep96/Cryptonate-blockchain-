// import { Grid, Typography } from "@mui/material";
// import PageHeading from "../common/PageHeading";
// const RecentActivity = () => {
//   return (
//     <Grid container>
//       <Grid item>
//         <PageHeading
//           title="All Activity"
//           subtitle="All donations made to and money withdrawn from the smart contract"
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default RecentActivity;
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box, Typography, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cryptonateSC from "../cryptonate";

const RecentActivity = ({ addCharityAddress }) => {
  const navigate = useNavigate();
  const [allDonations, setAllDonations] = useState();
  const [allWithdrawals, setAllWithdrawals] = useState();

  useEffect(() => {
    const getDonations = async () => {
      try {
        let provider = window.ethereum;
        let selectedAccount;
        if (typeof provider !== "undefined") {
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          selectedAccount = accounts[0];

          const res = await cryptonateSC.methods
            .getDonations(selectedAccount)
            .call({ from: selectedAccount });
          setAllDonations(res);
          console.log("All donations::", res);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    const getWithdrawals = async () => {
      try {
        let provider = window.ethereum;
        let selectedAccount;
        if (typeof provider !== "undefined") {
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          selectedAccount = accounts[0];

          const res = await cryptonateSC.methods
            .getWithdrawals(selectedAccount)
            .call({ from: selectedAccount });
          setAllWithdrawals(res);
          console.log("All Withdrawals::", res);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    getDonations();
    getWithdrawals();
  }, []);

  const chooseCharity = (addr) => {
    addCharityAddress(addr);
    navigate("/");
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        All Donations
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Donor Address</TableCell>
            <TableCell align="right">Donation Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allDonations &&
            allDonations[0].map(
              (name, i) =>
                name !== "0x0000000000000000000000000000000000000000" && (
                  <TableRow
                    onClick={() => chooseCharity(allDonations[2][i])}
                    sx={{
                      width: "610px",
                      height: "50px",
                      cursor: "pointer",
                      padding: 3,
                      background: "white",
                      color: "black",
                    }}
                    elevation={2}
                  >
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">{allDonations[1][i]}</TableCell>
                  </TableRow>
                )
            )}
        </TableBody>
      </Table>

      <Typography variant="h4" gutterBottom>
        All Withdrawals
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Expense Type</TableCell>
            <TableCell align="right">Withdrawal Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allWithdrawals &&
            allWithdrawals[0].map(
              (name, i) =>
                name !== "" && (
                  <TableRow
                    onClick={() => chooseCharity(allWithdrawals[2][i])}
                    sx={{
                      width: "610px",
                      height: "50px",
                      cursor: "pointer",
                      padding: 3,
                      background: "white",
                      color: "black",
                    }}
                    elevation={2}
                  >
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">{allWithdrawals[1][i]}</TableCell>
                  </TableRow>
                )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RecentActivity;

// const RecentActivity = ({ addCharityAddress }) => {
//   const navigate = useNavigate();
//   const [allDonations, setAllDonations] = useState();
//   const [allWithdrawals, setAllWithdrawals] = useState();

//   useEffect(() => {
//     const getDonations = async () => {
//       try {
//         let provider = window.ethereum;
//         let selectedAccount;
//         if (typeof provider !== "undefined") {
//           const accounts = await provider.request({
//             method: "eth_requestAccounts",
//           });
//           selectedAccount = accounts[0];

//           const res = await cryptonateSC.methods
//             .getDonations(selectedAccount)
//             .call({ from: selectedAccount });
//           setAllDonations(res);
//           console.log("All donations::", res);
//         }
//       } catch (error) {
//         console.log("Error", error);
//       }
//     };
//     const getWithdrawals = async () => {
//       try {
//         let provider = window.ethereum;
//         let selectedAccount;
//         if (typeof provider !== "undefined") {
//           const accounts = await provider.request({
//             method: "eth_requestAccounts",
//           });
//           selectedAccount = accounts[0];

//           const res = await cryptonateSC.methods
//             .getWithdrawals(selectedAccount)
//             .call({ from: selectedAccount });
//           setAllWithdrawals(res);
//           console.log("All Withdrawals::", res);
//         }
//       } catch (error) {
//         console.log("Error", error);
//       }
//     };

//     getDonations();
//     getWithdrawals();
//   }, []);

//   const chooseCharity = (addr) => {
//     addCharityAddress(addr);
//     navigate("/");
//   };

//   return (
//     <Box
//       sx={{
//         width: "100vw",
//         height: "100vh",
//         background: "#1F2937",
//         color: "white",
//         position: "absolute",
//         top: 0,
//         left: 200,
//         padding: "50px",
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         All Donations
//       </Typography>
//       {/* <Typography variant="subtitle1" gutterBottom>
//         Previously donated
//       </Typography> */}
//       <Stack spacing={8} sx={{ marginBottom: 5 }}>
//         {allDonations &&
//           allDonations[0].map(
//             (name, i) =>
//               name !== "0x0000000000000000000000000000000000000000" && (
//                 <Paper
//                   onClick={() => chooseCharity(allDonations[2][i])}
//                   sx={{
//                     width: "610px",
//                     height: "150px",
//                     cursor: "pointer",
//                     padding: 3,
//                     background: "#2D3748",
//                     color: "white",
//                   }}
//                   elevation={2}
//                 >
//                   <Typography variant="h5">{name}</Typography>
//                   <Typography variant="subtitle1">
//                     {allDonations[1][i]}
//                   </Typography>
//                 </Paper>
//               )
//           )}
//       </Stack>
//       {/* <Typography variant="subtitle1" gutterBottom>
//         Explore new charities
//       </Typography> */}
//       {/* <Stack spacing={4}>
//         <Paper
//           onClick={() => chooseCharity()}
//           sx={{
//             width: "600px",
//             height: "150px",
//             cursor: "pointer",
//             padding: 3,
//             background: "#2D3748",
//             color: "white",
//           }}
//           elevation={2}
//         >
//           <Typography variant="h5">Humans for Animals</Typography>
//           <Typography variant="subtitle1">Humans for Animals</Typography>
//         </Paper>
//       </Stack> */}
//       <Typography variant="h4" gutterBottom>
//         All Withdrawals
//       </Typography>
//       {/* <Typography variant="subtitle1" gutterBottom>
//         Previously donated
//       </Typography> */}
//       <Stack spacing={8} sx={{ marginBottom: 5 }}>
//         {allWithdrawals &&
//           allWithdrawals[0].map(
//             (name, i) =>
//               name !== "" && (
//                 <Paper
//                   onClick={() => chooseCharity(allWithdrawals[2][i])}
//                   sx={{
//                     width: "610px",
//                     height: "150px",
//                     cursor: "pointer",
//                     padding: 3,
//                     background: "#2D3748",
//                     color: "white",
//                   }}
//                   elevation={2}
//                 >
//                   <Typography variant="h5">{name}</Typography>
//                   <Typography variant="subtitle1">
//                     {allWithdrawals[1][i]}
//                   </Typography>
//                 </Paper>
//               )
//           )}
//       </Stack>
//       {/* <Typography variant="subtitle1" gutterBottom>
//         Explore new charities
//       </Typography> */}
//       {/* <Stack spacing={4}>
//         <Paper
//           onClick={() => chooseCharity()}
//           sx={{
//             width: "600px",
//             height: "150px",
//             cursor: "pointer",
//             padding: 3,
//             background: "#2D3748",
//             color: "white",
//           }}
//           elevation={2}
//         >
//           <Typography variant="h5">Humans for Animals</Typography>
//           <Typography variant="subtitle1">Humans for Animals</Typography>
//         </Paper>
//       </Stack> */}
//     </Box>

//   );
// };

// export default RecentActivity;
