
import React, { useState } from 'react';
import Login from './Login';
import Products from './Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const App = () => {
  const [token, setToken] = useState(null);
  const [view, setView] = useState('login'); 
  return (
    <div className="container">
      {view === 'login' && !token && <Login setToken={setToken} setView={setView} />}
      {view === 'products' && token && <Products token={token} setView={setView} />}
    </div>
  );
};

export default App;
