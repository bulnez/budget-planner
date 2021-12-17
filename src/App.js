import React from "react";
import { NotificationContainer } from "react-notifications";
import Registration from "./components/Pages/Registration/Registration";
import Login from "./components/Pages/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import Monthly from "./components/Pages/Monthly/Monthly";
import Yearly from "./components/Pages/Yearly/Yearly";
import NoData from "./components/Pages/Monthly/NoData";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import "../src/components/Styles/Global.css";
import Savings from "./components/Pages/Savings";

function App() {
  return (
    <Switch>
      <Navigation />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Route path="/:currYear/monthly/:month" component={Monthly} />
      <Route path="/yearly" component={Yearly} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/savings" component={Savings} />
      <Route path="/:currYear/no-data/:month" component={NoData} />
      <NotificationContainer />
    </Switch>
  );
}

export default App;
