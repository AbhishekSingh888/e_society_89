import './App.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import StatusState from './components/context/status/StatusState';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Alert from './components/Alert';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);
  const updateAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <StatusState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/">
              <Home updateAlert={updateAlert} />
            </Route>
            <Route exact path="/login">
              <Login updateAlert={updateAlert} />
            </Route>
            <Route exact path="/signup">
              <Signup updateAlert={updateAlert} />
            </Route>
          </Switch>
        </Router>
      </StatusState>
    </>
  );
}

export default App;
