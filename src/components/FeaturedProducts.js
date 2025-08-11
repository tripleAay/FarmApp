import React, { useEffect, useState } from 'react';

// Extended dummy data to demonstrate multiple rows
const dummyProducts = [
  {
    id: 1,
    name: 'Ripe Plantain Bunch',
    image: 'https://via.placeholder.com/300x192?text=Plantain',
    availability: 'Available Now',
    minOrder: '20kg',
    price: 1800,
    location: 'Ayo Farms, Lagos',
  },
  {
    id: 2,
    name: 'Fresh Tomatoes',
    image: 'https://via.placeholder.com/300x192?text=Tomatoes',
    availability: 'Available Now',
    minOrder: '15kg',
    price: 2500,
    location: 'Green Valley, Ogun',
  },
  {
    id: 3,
    name: 'Organic Yam Tubers',
    image: 'https://via.placeholder.com/300x192?text=Yam',
    availability: 'Limited Stock',
    minOrder: '10kg',
    price: 3200,
    location: 'Sunrise Farms, Enugu',
  },
  {
    id: 4,
    name: 'Sweet Potatoes',
    image: 'https://via.placeholder.com/300x192?text=Potatoes',
    availability: 'Available Now',
    minOrder: '25kg',
    price: 2000,
    location: 'Harvest Fields, Ibadan',
  },
  {
    id: 5,
    name: 'Cassava Tubers',
    image: 'https://via.placeholder.com/300x192?text=Cassava',
    availability: 'Available Now',
    minOrder: '30kg',
    price: 1500,
    location: 'Eco Farms, Abuja',
  },
  {
    id: 6,
    name: 'Green Peppers',
    image: 'https://via.placeholder.com/300x192?text=Peppers',
    availability: 'Limited Stock',
    minOrder: '10kg',
    price: 2800,
    location: 'Fresh Fields, Jos',
  },
  {
    id: 7,
    name: 'Maize Grains',
    image: 'https://via.placeholder.com/300x192?text=Maize',
    availability: 'Available Now',
    minOrder: '50kg',
    price: 1200,
    location: 'Golden Harvest, Kano',
  },
  {
    id: 8,
    name: 'Okra Pods',
    image: 'https://via.placeholder.com/300x192?text=Okra',
    availability: 'Available Now',
    minOrder: '12kg',
    price: 2200,
    location: 'River Farms, Port Harcourt',
  },
];

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/user");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // ✅ Empty array means run once on mount

  return (
    <section className="bg-[#E4FDE1] py-10">
      <div className="container mx-auto px-4">
        {/* Row 1: Title & optional controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured Products
          </h2>
          {/* Placeholder for future filter buttons */}
          <div className="hidden md:block">
            <button className="text-sm text-green-700 border border-green-600 px-4 py-1 rounded-full hover:bg-green-600 hover:text-white transition duration-200">
              Filter
            </button>
          </div>
        </div>

        {/* Row 2: Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={`http://localhost:5000/${product.thumbnail.replace(/\\/g, '/')}`}

                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${product.availability === 'Available Now'
                    ? 'text-green-600 bg-green-100'
                    : 'text-yellow-600 bg-yellow-100'
                    }`}
                >
                  {/* {product.quantity} */}
                  Available Now
                </p>
                <p className="text-gray-600 text-sm mt-2">Min order: {product.quantity || "1 Pack"}</p>
                <p className="text-yellow-600 font-semibold mt-1">
                  ₦{product.price.toLocaleString('en-NG')} / {product.quantity || "1 pack"}
                </p>
                <p className="text-gray-500 text-xs mt-2">{product.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;