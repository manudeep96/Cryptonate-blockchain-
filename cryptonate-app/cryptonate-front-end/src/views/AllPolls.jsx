import PageHeading from "../common/PageHeading";
import { Box, Typography, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";

const AllPolls = ({ userType, address }) => {
  return (
    <Box>
      <PageHeading
        title="All polls"
        subtitle="Polls raised to meet expenses of the charity"
      />
      <Typography variant="h6" gutterBottom>
        Active polls
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          {userType === "donor" && (
            <Stack direction="row" spacing={3}>
              <Button variant="contained" color="success">
                Approve
              </Button>
              <Button variant="contained" color="error">
                Disapprove
              </Button>
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AllPolls;
