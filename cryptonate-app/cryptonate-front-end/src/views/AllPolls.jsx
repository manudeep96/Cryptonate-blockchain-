import PageHeading from "../common/PageHeading";
import { Box, Typography, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import cryptonateSC from "../cryptonate";

const AllPolls = ({ userType, address, charityAddress }) => {
  const [polls, setPolls] = useState([]);

  const vote = async (id, voteType) => {
    console.log("DISAPPREVEDDDDD");
    try {
      let provider = window.ethereum;
      let selectedAccount;
      if (typeof provider !== "undefined") {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        selectedAccount = accounts[0];

        const res = await cryptonateSC.methods
          .vote(id, charityAddress, voteType)
          .call({ from: selectedAccount });
        console.log("RESPONSE", res);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const constructPolls = (res) => {
    let polls = [];
    for (let i = 0; i < res[0]?.length; i++) {
      if (res[2][i] !== "") {
        polls[i] = {};
        polls[i].description = res[2][i];
        polls[i].id = i;
        let app = res[0][i] + 0;
        let dis = res[1][i] + 0;
        let status;
        if (app + dis > 0) {
          status = `Approved by ${app / (app + dis)}`;
        } else {
          status = "Voting in progress";
        }
        polls[i].status = status;
      }
    }
    console.log("Constructed polls", polls);
    setPolls(polls);
  };

  useEffect(() => {
    const getPolls = async () => {
      try {
        let provider = window.ethereum;
        let selectedAccount;
        if (typeof provider !== "undefined") {
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          selectedAccount = accounts[0];

          const res = await cryptonateSC.methods
            .getPolls(charityAddress)
            .call({ from: selectedAccount });
          console.log("RESPONSE", res);
          constructPolls(res);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    getPolls();
  }, [charityAddress]);

  return (
    <Box>
      <PageHeading
        title="All polls"
        subtitle="Polls raised to meet expenses of the charity"
      />
      <Typography variant="h6" gutterBottom>
        Active polls
      </Typography>

      {polls.length > 0 && (
        <Box sx={{ width: "40vw" }}>
          {polls.map((poll) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">{poll.description}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography gutterBottom variant="body1">
                  {poll.status}
                </Typography>

                {userType === "donor" && (
                  <Stack direction="row" spacing={3}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => console.log("VOTEDDDDD")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => vote(poll.id, 0)}
                    >
                      Disapprove
                    </Button>
                  </Stack>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AllPolls;
