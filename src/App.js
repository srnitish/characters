import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from './Post';
import Characters from './Characters';
const CharacterDetails = React.lazy(() => import('./CharacterDetails'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/post" element={<Post />} />
        <Route path="/character/:id" element={<Suspense fallback={<h6>Loading...</h6>}><CharacterDetails /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
