import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import ProductDetails from './pages/products/Products';
import OrderInfo from './pages/OrderInfo';
import Profile from './pages/Profile';
import ButtomNav from './components/ButtomNav'; // Ensure this matches the file name

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } },
});

function App() {
  const location = useLocation();
  const getActiveTab = () => {
    if (location.pathname === '/dashboard') return 'home';
    if (location.pathname === '/cart') return 'cart';
    if (location.pathname === '/products') return 'waitlist';
    if (location.pathname === '/profile') return 'profile';
    return 'home';
  };
  const showNav = !['/', '/getstarted', '/farmer', '/foodie', '/login'].includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
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
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/farmerdashboard" element={<FarmerDashboard />} />
            <Route path="/products-add" element={<FarmerAddProduct />} />
            <Route path="/products-display" element={<ProductsDisplay />} />
            <Route path="/farmer-order" element={<FarmerOrder />} />
            <Route path="/edit-product/:id" element={<EdditProduct />} />
            <Route path="/order/:id" element={<OrderInfo />} />
            <Route path="/edit-profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {showNav && <ButtomNav activeTab={getActiveTab()} />}
      </div>
    </QueryClientProvider>
  );
}

export default App;