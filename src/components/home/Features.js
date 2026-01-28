import React from 'react';
import { Truck, Leaf, ShieldCheck, CurrencyDollar } from '@phosphor-icons/react';
import { POLICIES } from '../../constants/config';
import './Features.css';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <Truck size={48} weight="duotone" />,
      title: 'Free Delivery',
      description: 'Complimentary shipping on all orders above ₹499'
    },
    {
      id: 2,
      icon: <Leaf size={48} weight="duotone" />,
      title: '100% Natural',
      description: 'Clinically tested herbal formulations. Zero harmful chemicals.'
    },
    {
      id: 3,
      icon: <ShieldCheck size={48} weight="duotone" />,
      title: 'Quality Assured',
      description: 'Dermatologically tested. GMP certified manufacturing.'
    },
    {
      id: 4,
      icon: <CurrencyDollar size={48} weight="duotone" />,
      title: `${POLICIES.RETURN_POLICY_DAYS}-Day Guarantee`,
      description: 'Not satisfied? Full refund, no questions asked.'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

