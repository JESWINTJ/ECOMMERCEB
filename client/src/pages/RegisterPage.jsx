import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email: emailId, // Backend expects 'email'
          password: newPassword, // Backend expects 'password'
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Registration failed');
      }

      setMessage(data.msg + ' Redirecting to login...');
      // Optionally store token if registration also logs in
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(`Error: ${error.message}`);
    }

    // Clear form fields after submission attempt
    setUsername('');
    setNewPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
    setEmailId('');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header />

      {/* Main Content Area - Signup Form */}
      <main className="flex-grow container mx-auto p-4 flex items-center justify-center relative">
        <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-md z-10">
          <h2 className="text-3xl font-light text-center mb-6 text-gray-800">sign up</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="signup-username" className="block text-gray-700 text-sm font-light mb-1">enter username</label>
              <input
                type="text"
                id="signup-username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="signup-newPassword" className="block text-gray-700 text-sm font-light mb-1">enter new password</label>
              <input
                type="password"
                id="signup-newPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="signup-confirmPassword" className="block text-gray-700 text-sm font-light mb-1">confirm password</label>
              <input
                type="password"
                id="signup-confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="signup-phoneNumber" className="block text-gray-700 text-sm font-light mb-1">enter phoneno</label>
              <input
                type="tel"
                id="signup-phoneNumber"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="signup-emailId" className="block text-gray-700 text-sm font-light mb-1">enter emailid</label>
              <input
                type="email"
                id="signup-emailId"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>

            {message && (
              <div className={`text-center text-sm ${message.includes('match') || message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                already have an account?{' '}
                <a href="#" className="text-blue-600 hover:underline" onClick={() => navigate('/login')}>Login</a>
              </p>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-light shadow-md"
              >
                register
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RegisterPage;
