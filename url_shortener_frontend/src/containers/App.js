import React from 'react';
import '../App.css';
import MainContainer from './MainContainer'
import Nav from './Nav'
import DenseAppBar from './AppBar'

function App() {
  return (
    <div className="App">
     <DenseAppBar />
     <MainContainer />
    </div>
  );
}

export default App;
