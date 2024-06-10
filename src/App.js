import React, { Suspense,lazy } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
const Post = lazy(()=> import('./Post'));
const Characters = lazy(()=> import('./Characters'));
const CharacterDetails = lazy(() => import('./CharacterDetails'));

function App() {
  return (
    <Router>
    <Suspense fallback={<h6>Loading...</h6>}>
      <Routes>
        <Route exact path="/post" element={<Post />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
        </Suspense>
    </Router>
  );
}

export default App;
