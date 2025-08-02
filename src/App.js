import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GetStarted from './pages/Getstarted';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/getstarted' element={<GetStarted/>}/>
    </Routes>
  );
}

export default App;
