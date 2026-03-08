import React, { useState } from 'react';
import { Package, ShoppingCart, Tag } from '@phosphor-icons/react';
import ProductManager from '../components/admin/ProductManager';
import OrderManager from '../components/admin/OrderManager';
import CategoryManager from '../components/admin/CategoryManager';
import '../components/admin/Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { key: 'orders', label: 'Orders', icon: ShoppingCart },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'categories', label: 'Categories', icon: Tag },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header-bar">
        <h1>Admin Panel</h1>
        <nav className="admin-nav-tabs">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={activeTab === key ? 'active' : ''}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'orders' && <OrderManager key="orders" />}
      {activeTab === 'products' && <ProductManager key="products" />}
      {activeTab === 'categories' && <CategoryManager key="categories" />}
    </div>
  );
};

export default AdminDashboard;
