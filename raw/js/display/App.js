import Globals from 'Globals';
import React from 'react';
import { Router, Route, Link } from 'react-router'

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
    }
  }

  render()
  {
    return (
      <div className='App'>
        <h1>App Name</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/subpage">Sub Page</Link></li>
          </ul>
        </nav>
        { this.props.children }
      </div>
    );
  }
}

export default App;