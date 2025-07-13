import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

function LoginPage() {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailId,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      localStorage.setItem('token', data.token); // Store the JWT token
      setMessage(data.msg + ' Redirecting to home...');
      setTimeout(() => navigate('/'), 1500); // Redirect to home after 1.5 seconds
    } catch (error) {
      console.error('Login error:', error);
      setMessage(`Error: ${error.message}`);
    }

    setEmailId('');
    setPassword('');
  };

  // Removed navigateToForm state and function as we are now using react-router-dom for navigation

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header />

      {/* Main Content Area - Login Form */}
      <main className="flex-grow container mx-auto p-4 flex items-center justify-center relative">
        {/* Background elements from Home Page (simplified for visual context) */}
        <div className="absolute inset-0 z-0 opacity-50">
          <section className="bg-blue-100 rounded-xl p-8 mb-8 text-center text-blue-800 text-xl font-medium shadow-inner">
            banners ads
          </section>
          <section className="mb-8">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">Best of electronics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md">
                <img src="https://placehold.co/100x100/ADD8E6/000000?text=Watch" alt="Watch" className="rounded-lg mb-2" />
                <span className="text-gray-700 text-sm">Product Name</span>
              </div>
              <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md">
                <img src="https://placehold.co/100x100/ADD8E6/000000?text=TV" alt="TV" className="rounded-lg mb-2" />
                <span className="text-gray-700 text-sm">Product Name</span>
              </div>
            </div>
          </section>
          <section className="mb-8">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">Best of furniture</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md">
                <img src="https://placehold.co/100x100/ADD8E6/000000?text=Chair" alt="Chair" className="rounded-lg mb-2" />
                <span className="text-gray-700 text-sm">Product Name</span>
              </div>
              <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md">
                <img src="https://placehold.co/100x100/ADD8E6/000000?text=Table" alt="Table" className="rounded-lg mb-2" />
                <span className="text-gray-700 text-sm">Product Name</span>
              </div>
            </div>
          </section>
        </div>

        <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-md z-10">
          <h2 className="text-3xl font-light text-center mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-emailId" className="block text-gray-700 text-sm font-light mb-1">enter emailID</label>
              <input
                type="email"
                id="login-emailId"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-gray-700 text-sm font-light mb-1">enter password</label>
              <input
                type="password"
                id="login-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <div className="text-center text-sm text-red-500">
                {message}
              </div>
            )}

            <div className="flex flex-col items-start mt-6 space-y-2">
              <a href="#" className="text-sm text-blue-600 hover:underline">forgot password?</a>
              <p className="text-sm text-gray-600">
                new User? <a href="#" className="text-blue-600 hover:underline ml-1" onClick={() => navigate('/register')}>signup here</a>
              </p>
              <p className="text-sm text-gray-600">
                new Seller? <a href="#" className="text-blue-600 hover:underline ml-1" onClick={() => navigate('/register')}>signup here</a>
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-light shadow-md"
              >
                login
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LoginPage;
