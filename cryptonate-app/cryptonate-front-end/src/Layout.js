import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { privateRoutes, donorPages, charityPages } from "./routes";
import AllPolls from "./views/AllPolls";
import { Drawer } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function Layout() {
  const navigate = useNavigate();
  const authenticated = true;
  let showDrawer = true;
  let userType = "donor";

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
      <div className="App">
        {showDrawer && (
          <Drawer variant="permanent" open>
            {drawer}
          </Drawer>
        )}
        <Routes>
          {privateRoutes.map((route) => (
            <Route path={route.path} element={<route.element />} />
          ))}
          <Route path="*" element={<Navigate replace to="/allpolls" />} />
        </Routes>
      </div>
    );
  }
}

export default Layout;
