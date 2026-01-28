import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Contact from './pages/Contact';
import ReturnRefund from './pages/ReturnRefund';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReviewsPage from './pages/ReviewsPage';
import { ROUTES } from './constants/routes';
import './styles/globals.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductPage />} />
              <Route path={ROUTES.CONTACT} element={<Contact />} />
              <Route path={ROUTES.RETURN_REFUND} element={<ReturnRefund />} />
              <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
              <Route path={ROUTES.REVIEWS} element={<ReviewsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

