import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
