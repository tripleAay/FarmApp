import './App.css';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import GetStarted from './pages/Getstarted';
import Farmer from './pages/Farmer';
import Foodie from './pages/Foodie';
import Login from './pages/Login';
import Dashboard from './pages/UserDashboard';
import FeaturedProducts from './components/FeaturedProducts';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';
import FarmerDashboard from './pages/Farmer/FarmerDashboard';
import FarmerAddProduct from './pages/Farmer/FarmerProducts';
import ProductsDisplay from './pages/Farmer/FarmerProductDisplay';
import FarmerOrder from './pages/Farmer/FarmerOrder';
import EdditProduct from './pages/Farmer/EdditProduct';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/foodie" element={<Foodie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<FeaturedProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/farmerdashboard" element={<FarmerDashboard />} />
        <Route path="/products-add" element={<FarmerAddProduct />} />
        <Route path="/products-display" element={<ProductsDisplay />} />
        <Route path="/farmer-order" element={<FarmerOrder />} />
        <Route path="/edit-product/:id" element={<EdditProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;