import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

function ReviewPage() {
  const navigate = useNavigate();
  const { productId } = useParams(); // Get product ID from URL if reviewing a specific product

  const [rating, setRating] = useState(0); // State for selected star rating
  const [reviewText, setReviewText] = useState(''); // State for review text
  const [message, setMessage] = useState('');

  // Dummy product data (reused from previous pages)
  const product = {
    id: productId || '60c72b2f9b1e8b001c8e4d1a', // Use ID from params or a default
    name: 'Mivi Play 12HRS Playback, Bass Boosted, TWS Feature, IPX4 5 W Portable Bluetooth Speaker (Black, Mono Channel)',
    imageUrl: 'https://placehold.co/150x150/000000/FFFFFF?text=MIVI', // Placeholder for Mivi Speaker
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      setMessage('Please select a star rating.');
      return;
    }
    if (!reviewText.trim()) {
      setMessage('Please enter your review.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage after login
      if (!token) {
        setMessage('You must be logged in to submit a review.');
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Send the token in the header
        },
        body: JSON.stringify({
          productId: product.id,
          rating,
          reviewText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to submit review');
      }

      setMessage(data.msg); // "Review submitted successfully!"
      setRating(0); // Reset rating
      setReviewText(''); // Clear review text
      // Optionally navigate back to product page or home after review
      // setTimeout(() => navigate(`/product/${product.id}`), 2000);
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header />

      {/* Main Content Area - Review Section */}
      <main className="flex-grow container mx-auto p-4 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Product Image */}
        <div className="flex flex-col items-center md:w-1/3 p-4 bg-white rounded-xl shadow-lg">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-w-full h-auto rounded-lg mb-6 border border-gray-200"
          />
        </div>

        {/* Review Input */}
        <div className="flex-grow md:w-2/3 p-4 flex flex-col items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mb-6">
            <div className="flex justify-center mb-6 space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className={`w-10 h-10 cursor-pointer transition-colors duration-200 ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>

            <div className="p-4 border border-gray-300 rounded-lg">
              <textarea
                className="w-full h-32 p-2 resize-none focus:outline-none"
                placeholder="enter reviews"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
          </div>

          {message && (
            <div className={`text-center text-sm mb-4 ${message.includes('Please') || message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleSubmitReview}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md w-full max-w-md"
          >
            Submit Review
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReviewPage;
