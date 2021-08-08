import { BrowserRouter  as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Asset from './Asset'
import Home from './Home'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/:tokenAddress/:tokenId">
          <Asset />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
