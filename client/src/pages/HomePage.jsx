import React from 'react';
import { useNavigate } from 'react-router-dom';
// Removed Header and Footer imports

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* Header component removed from here */}

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4">
        {/* Banners Ads Section */}
        <section className="bg-blue-100 rounded-xl p-8 mb-8 text-center text-blue-800 text-xl font-medium shadow-inner">
          banners ads
        </section>

        {/* Best of Electronics Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-medium text-gray-800 mb-4">Best of electronics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder for Electronic Product 1 */}
            <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/product/1')}>
              <img src="https://placehold.co/100x100/ADD8E6/000000?text=Watch" alt="Watch" className="rounded-lg mb-2" />
              <span className="text-gray-700 text-sm">Product Name</span>
            </div>
            {/* Placeholder for Electronic Product 2 */}
            <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/product/2')}>
              <img src="https://placehold.co/100x100/ADD8E6/000000?text=TV" alt="TV" className="rounded-lg mb-2" />
              <span className="text-gray-700 text-sm">Product Name</span>
            </div>
            {/* Placeholder for Electronic Product 3 */}
            <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/product/3')}>
              <img src="https://placehold.co/100x100/ADD8E6/000000?text=Camera" alt="Camera" className="rounded-lg mb-2" />
              <span className="text-gray-700 text-sm">Product Name</span>
            </div>
            {/* Placeholder for Electronic Product 4 */}
            <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/product/4')}>
              <img src="https://placehold.co/100x100/ADD8E6/000000?text=Printer" alt="Printer" className="rounded-lg mb-2" />
              <span className="text-gray-700 text-sm">Product Name</span>
            </div>
          </div>
        </section>

        {/* Best of Furniture Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-medium text-gray-800 mb-4">Best of furniture</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder for Furniture Product 1 */}
            <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/product/5')}>
              <img src="https://placehold.co/100x100/ADD8E6/000000?text=Chair" alt="Chair" className="rounded-lg mb-2" />
              <span className="text-gray-700 text-sm">Product Name</span>
            </div>
            {/* Placeholder for Furniture Product 2 */}
            <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/product/6')}>
              <img src="https://placehold.co/100x100/ADD8E6/000000?text=Table" alt="Table" className="rounded-lg mb-2" />
              <span className="text-gray-700 text-sm">Product Name</span>
            </div>
            {/* Placeholder for Furniture Product 3 */}
            <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/product/7')}>
              <img src="https://placehold.co/100x100/ADD8E6/000000?text=Desk" alt="Desk" className="rounded-lg mb-2" />
              <span className="text-gray-700 text-sm">Product Name</span>
            </div>
            {/* Placeholder for Furniture Product 4 */}
            <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/product/8')}>
              <img src="https://placehold.co/100x100/ADD8E6/000000?text=Sofa" alt="Sofa" className="rounded-lg mb-2" />
              <span className="text-gray-700 text-sm">Product Name</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer component removed from here */}
    </div>
  );
}

export default HomePage;
