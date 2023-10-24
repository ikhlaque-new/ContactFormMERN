import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './components/List';
import Create from './components/Create';
import Update from './components/Update';
// import Delete from './components/Delete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route exact path="/update/:id" element={<Update />} />
        {/* <Route exact path="/delete/:id" component={Delete} /> */}
      </Routes>
    </Router>
  );
}

export default App;