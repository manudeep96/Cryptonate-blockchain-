import { Grid, Typography } from "@mui/material";
const PageHeading = ({ title, subtitle }) => {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </>
  );
};

export default PageHeading;
