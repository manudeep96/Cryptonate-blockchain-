import { Grid, Typography } from "@mui/material";
import PageHeading from "../common/PageHeading";
const RecentActivity = () => {
  return (
    <Grid container>
      <Grid item>
        <PageHeading
          title="All Activity"
          subtitle="All donations made to and money withdrawn from the smart contract"
        />
      </Grid>
    </Grid>
  );
};

export default RecentActivity;
