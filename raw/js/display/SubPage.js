import React from 'react';

class SubPage extends React.Component
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
      <div className='SubPage'>
        <h2>Welcome to A Sub Page of the app</h2>
      </div>
    );
  }
}

export default SubPage;