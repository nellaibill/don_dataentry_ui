
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/index';
import DataEntry from './DataEntry';
import Report from './report';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/DataEntry' exact component={DataEntry} />
        <Route path='/report' component={Report} />
        
      </Switch>
    </Router>
  );
}
  
export default App;
