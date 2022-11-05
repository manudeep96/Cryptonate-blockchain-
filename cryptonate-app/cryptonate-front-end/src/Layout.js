import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { privateRoutes } from "./routes";
import { Drawer, Box, Grid, CssBaseline } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function Layout() {
  const navigate = useNavigate();
  const authenticated = true;
  let userType = "charity";

  const drawer = (
    <div>
      <List>
        {privateRoutes
          .filter((route) => route.sideBar)
          .filter((route) => route?.userType?.includes(userType))
          .map((route, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(route.path)}>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  if (authenticated) {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box>
          <Drawer
            sx={{
              width: "200px",
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: "200px",
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 4 }}
        >
          <Routes>
            {privateRoutes.map((route) => (
              <Route path={route.path} element={<route.element />} />
            ))}
            <Route path="*" element={<Navigate replace to="/allpolls" />} />
          </Routes>
        </Box>
      </Box>
    );
  }
}

export default Layout;
