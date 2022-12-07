import { Typography, Box } from "@mui/material";
const PageHeading = ({ title, subtitle }) => {
  return (
    <Box mb={3}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  );
};

export default PageHeading;
