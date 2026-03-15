import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login', 'forgot_email', 'forgot_pin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login, verifyPinLogin } = useAuth();
  const navigate = useNavigate();

  const handleStandardLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccessMsg('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleSendPin = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccessMsg('');
    try {
      await api.post('/auth/forgot-password', { email });
      setSuccessMsg('A 6-digit PIN has been sent to your email.');
      setMode('forgot_pin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send PIN.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPin = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccessMsg('');
    try {
      await verifyPinLogin(email, pin);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired PIN.');
    } finally {
      setLoading(false);
    }
  };

  const resetState = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
    if (newMode === 'login') {
      setPassword('');
    }
    setPin('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>
          {mode === 'login' && 'Login'}
          {mode === 'forgot_email' && 'Reset Password'}
          {mode === 'forgot_pin' && 'Enter PIN'}
        </h2>
        
        {error && <p className="error-message" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
        {successMsg && <p className="success-message" style={{ color: '#10b981', marginBottom: '1rem', textAlign: 'center' }}>{successMsg}</p>}

        {mode === 'login' && (
          <form onSubmit={handleStandardLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ margin: 0 }}>Password</label>
                <button type="button" onClick={() => resetState('forgot_email')} style={{ background: 'none', border: 'none', color: '#6b46c1', fontSize: '0.85rem', cursor: 'pointer', padding: 0 }}>Forgot Password?</button>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p style={{ marginTop: '1.5rem' }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        )}

        {mode === 'forgot_email' && (
          <form onSubmit={handleSendPin}>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem', textAlign: 'center' }}>
              Enter your registered email address and we'll send you a 6-digit secure PIN to log in.
            </p>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} autoFocus />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Secure PIN'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button type="button" onClick={() => resetState('login')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Back to Login</button>
            </div>
          </form>
        )}

        {mode === 'forgot_pin' && (
          <form onSubmit={handleVerifyPin}>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem', textAlign: 'center' }}>
              Please check <strong>{email}</strong> for your 6-digit PIN.
            </p>
            <div className="form-group">
              <label>6-Digit PIN</label>
              <input 
                type="text" 
                maxLength="6" 
                value={pin} 
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} 
                required 
                disabled={loading}
                autoFocus
                style={{ fontSize: '1.5rem', letterSpacing: '4px', textAlign: 'center', padding: '0.75rem' }} 
              />
            </div>
            <button type="submit" className="auth-button" disabled={loading || pin.length !== 6}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button type="button" onClick={() => resetState('forgot_email')} style={{ background: 'none', border: 'none', color: '#6b46c1', cursor: 'pointer' }}>Didn't receive it? Try again</button>
              <button type="button" onClick={() => resetState('login')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Back to Login</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
