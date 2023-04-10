import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Router/Login';
import Signup from './Router/Signup';
import Messages from './Router/Messages';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Login />
      </Route>
      <Route  path='/signup'>
        <Signup />
      </Route>
      <Route  path='/messages'>
        <Messages />
      </Route>
    
    </Switch>
  );
}

export default App;
