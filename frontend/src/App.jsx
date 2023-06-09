import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdatePage from './routes/UpdatePage';
import Home from './routes/Home';
import { FastfoodContextProvider } from './context/FastfoodContext';
import FastfoodDetailPage from './routes/FastfoodDetailPage';

const App = () => {
  return (
    <FastfoodContextProvider>
      <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fastfood/:id/update" element={<UpdatePage />} />
          <Route path="/fastfood/:id" element={<FastfoodDetailPage />} />
        </Routes>
      </Router>
    </div>
    </FastfoodContextProvider>
  );
};

export default App;
