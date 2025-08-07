import React from 'react';
import { Link } from 'react-router-dom';
import DashHead from '../components/DashHead'; 
import UserHead from '../components/userHead';
import FeaturedProducts from '../components/FeaturedProducts';
import UserOrder from '../components/userOrder';
import BottomNav from '../components/ButtomNav';

const UserDashboard = () => {
  // Placeholder data (replace with API calls if needed)
  const stats = {
    totalFarmers: 150,
    produceItems: 320,
    totalSales: '$12,500',
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <DashHead />
      <UserHead/>
      <FeaturedProducts/>
      <UserOrder/>
      <BottomNav/>

      
    </div>
  );
};

export default UserDashboard;