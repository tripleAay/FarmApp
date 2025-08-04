import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GetStarted from './pages/Getstarted';
import Farmer from './pages/Farmer';
import Foodie from './pages/Foodie';
import Login from './pages/Login';
import Dashboard from './pages/UserDashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/getstarted' element={<GetStarted/>}/>
      <Route path='/farmer' element={<Farmer/>}/>
      <Route path='/foodie' element={<Foodie/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
