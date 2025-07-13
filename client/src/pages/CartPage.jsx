import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/layout/Header.jsx'; // Import Header
import Footer from '../components/layout/Footer.jsx'; // Import Footer

function CartPage() { // Removed navigateTo prop
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Dummy cart item data
  const [cartItem, setCartItem] = useState({
    id: 1,
    name: 'Mivi Play 12HRS Playback, Bass Boosted, TWS Feature, IPX4 5 W Portable Bluetooth Speaker (Black, Mono Channel)',
    imageUrl: 'https://placehold.co/150x150/000000/FFFFFF?text=MIVI', // Placeholder for Mivi Speaker
    price: 2449,
    quantity: 1,
  });

  // Price details calculation (simplified for frontend display)
  const discount = 1412; // Example fixed discount
  const coupons = 12; // Example fixed coupon discount
  const platformFee = 4; // Example fixed platform fee

  const calculateTotal = () => {
    const itemPrice = cartItem.price * cartItem.quantity;
    const total = itemPrice - discount - coupons + platformFee;
    return total;
  };

  const handleQuantityChange = (type) => {
    setCartItem(prevItem => {
      let newQuantity = prevItem.quantity;
      if (type === 'increment') {
        newQuantity = prevItem.quantity + 1;
      } else if (type === 'decrement' && prevItem.quantity > 1) {
        newQuantity = prevItem.quantity - 1;
      }
      return { ...prevItem, quantity: newQuantity };
    });
  };

  const handleBuyNow = () => {
    console.log('Buying items in cart:', cartItem);
    // In a real app, you'd initiate the checkout process with cartItem data
    navigate('/checkout'); // Navigate to checkout page using react-router-dom
  };

  const handleRemove = () => {
    console.log('Removing item from cart:', cartItem.name);
    // In a real app, you'd send a request to backend to remove item
    setCartItem(null); // Clear cart for demonstration
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    console.log('User logged out');
    navigate('/login'); // Redirect to login page using react-router-dom
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header /> {/* Render Header component */}

      {/* Main Content Area - Cart Details */}
      <main className="flex-grow container mx-auto p-4 flex flex-col md:flex-row items-start md:items-stretch gap-8">
        {cartItem ? (
          <>
            {/* Product Image and Quantity Controls */}
            <div className="flex flex-col items-center md:w-1/3 p-4 bg-white rounded-xl shadow-lg">
              <img
                src={cartItem.imageUrl}
                alt={cartItem.name}
                className="max-w-full h-auto rounded-lg mb-6 border border-gray-200"
              />
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-6">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xl font-semibold focus:outline-none"
                >
                  -
                </button>
                <span className="px-6 py-2 text-lg font-semibold text-gray-800 border-l border-r border-gray-300">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xl font-semibold focus:outline-none"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                className="w-full bg-yellow-400 text-gray-800 font-semibold py-3 px-6 rounded-lg text-lg mb-4 hover:bg-yellow-500 transition duration-300 shadow-md"
              >
                buy now
              </button>
              <button
                onClick={handleRemove}
                className="w-full bg-yellow-200 text-gray-800 font-semibold py-3 px-6 rounded-lg text-lg hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                remove
              </button>
            </div>

            {/* Price Details */}
            <div className="flex-grow p-4 bg-white rounded-xl shadow-lg">
              <h2 className="text-xl font-medium text-gray-800 mb-4 border-b pb-3">PRICE DETAILS</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Price ({cartItem.quantity} item)</span>
                  <span>₹{cartItem.price * cartItem.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-600">- ₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupons for you</span>
                  <span className="text-green-600">- ₹{coupons}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
              <p className="text-green-600 font-semibold mt-4">
                You will save ₹{(cartItem.price * cartItem.quantity) - calculateTotal()} on this order
              </p>
            </div>
          </>
        ) : (
          <div className="w-full text-center p-8 bg-white rounded-xl shadow-lg">
            <p className="text-xl text-gray-700">Your cart is empty.</p>
            <button
              onClick={() => navigate('/')} // Navigate to home to continue shopping using react-router-dom
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </main>

      <Footer /> {/* Render Footer component */}
    </div>
  );
}

export default CartPage;
