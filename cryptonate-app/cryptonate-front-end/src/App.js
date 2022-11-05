import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { privateRoutes, donorPages, charityPages } from "./routes";

import Layout from "./Layout";
function App() {
  const authenticated = true;
  let showDrawer = true;
  let userType = "donor";

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
