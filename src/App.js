import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Registration from "./components/Pages/Registration/Registration";
import Login from "./components/Pages/Login/Login";
import Monthly from "./components/Pages/Monthly/Monthly";
import Yearly from "./components/Pages/Yearly/Yearly";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddExpense from "./components/Pages/Add Expense/Add";
import { useState } from "react";
import "react-notifications/lib/notifications.css";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import styles from "../src/components/Styles/Global.module.css";
import Savings from "./components/Pages/Savings";

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/registration" component={Registration} />
      <Route path="/monthly" component={Monthly} />
      <Route path="/yearly" component={Yearly} />
      <Route path="/addexpense" component={AddExpense} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/savings" component={Savings} />
      <Navigation></Navigation>
    </Switch>
  );
}

export default App;
