import React from 'react';
import Homepage from './pages/guest/homepage';
import Header from './component/header/Header';

function App() {
    return (
        <div className="App">
          <Header/>
          <main>
            <Homepage />
          </main>
        </div>
      );
    }    

export default App;
