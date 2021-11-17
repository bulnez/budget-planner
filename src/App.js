import { NotificationContainer } from "react-notifications";
import Registration from "./components/Pages/Registration/Registration";
import Login from "./components/Pages/Login/Login";
import Monthly from "./components/Pages/Monthly/Monthly";
import Yearly from "./components/Pages/Yearly/Yearly";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import AddExpense from "./components/Pages/Add Expense/Add";
import "react-notifications/lib/notifications.css";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import "../src/components/Styles/Global.css";
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
      <NotificationContainer />
    </Switch>
  );
}

export default App;
