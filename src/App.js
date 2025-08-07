import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GetStarted from './pages/Getstarted';
import Farmer from './pages/Farmer';
import Foodie from './pages/Foodie';
import Login from './pages/Login';
import Dashboard from './pages/UserDashboard';
import FeaturedProducts from './components/FeaturedProducts';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';
import FarmerDashboard from './pages/FarmerDashboard';
import FarmerAddProduct from './pages/FarmerProducts';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/getstarted' element={<GetStarted/>}/>
      <Route path='/farmer' element={<Farmer/>}/>
      <Route path='/foodie' element={<Foodie/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/products' element={<FeaturedProducts/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/profile' element={<UserProfile/>}/>
      <Route path='/farmerdashboard' element={<FarmerDashboard/>}/>
       <Route path='/products-add' element={<FarmerAddProduct/>}/>
    </Routes>
  );
}

export default App;
