import './App.css';
import CharacterDetails from './CharacterDetails';
import Characters from './Characters';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/characters" element={<Characters/>}/>
          <Route exact path="/character/:id" element={<CharacterDetails/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
