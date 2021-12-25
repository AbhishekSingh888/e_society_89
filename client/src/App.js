import './App.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
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
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <Switch>
          <Route exact path="/">
            <Home updateAlert={updateAlert}/>
          </Route>
          <Route exact path="/login">
            <Login updateAlert={updateAlert}/>
          </Route>
          <Route exact path="/signup">
            <Signup updateAlert={updateAlert}/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
