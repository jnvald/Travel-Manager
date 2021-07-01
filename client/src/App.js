import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './views/Dashboard'
import NewTravelForm from './views/NewTravelForm';
// import Login from './Auth/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <div> 
        <Switch>         
          <Route exact path="/">
            <Dashboard />
          </Route> 
          <Route exact path="/new">
            <NewTravelForm />
          </Route> 
          {/* <Route exact path="/login">
            <Login/>
          </Route> */}
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;