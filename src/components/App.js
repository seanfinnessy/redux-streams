import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const PageOne = () => {
  return (
    <Link to='/pagetwo'>Nav to Page Two</Link>  
  )
};

const PageTwo = () => {
  return (
    <Link to='/'>Nav to Page One</Link>  
  )
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={PageOne} />
          <Route path="/pagetwo" component={PageTwo} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;