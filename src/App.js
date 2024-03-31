import './App.css';
import CharacterDetails from './CharacterDetails';
// import Countries from './Countries.js';
// import Users from './Users';
// import RealUser from './RealUser';
// import Meals from './Meals';
// import Gitapi from './Gitapi';
// import ParallelApi from './ParallelAPI';
import Characters from './Characters';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

  //  <>
  //  <Countries/>
  //  <Meals/>
  //  <Users/>
  //  <Gitapi/>
  // <ParallelApi/>
  // <RealUser/> 
  // <Characters/>
  //  </>
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact Component={Characters}/>
          <Route path="/character/:id" Component={CharacterDetails}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
