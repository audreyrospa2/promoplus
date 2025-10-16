import { useState } from 'react';

interface Product {
  slug: string;
  data: {
    title: string;
    category: string;
    image: string;
    description: string;
    link: string;
    featured: boolean;
  };
}

interface ProductFilterProps {
  products: Product[];
}

export default function ProductFilter({ products }: ProductFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'HR', 'Marketing', 'Finance', 'Operations', 'Technology', 'Health'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.data.category === selectedCategory;
    const matchesSearch = product.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.data.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Sidebar Filter */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
          <h3 className="text-xl font-bold mb-4">Filter Products</h3>
          
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-700">Categories</h4>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-500 text-white font-bold'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="lg:col-span-3">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.slug} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-orange-100">
                  {product.data.featured && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                  <img
                    src={product.data.image}
                    alt={product.data.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                      {product.data.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                    {product.data.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.data.description}
                  </p>

                  <div className="flex gap-2">
                    <a
                      href={`/products/${product.slug}`}
                      className="flex-1 text-center py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all"
                    >
                      Learn More
                    </a>
                    <a
                      href={product.data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-purple-600 text-white rounded-lg font-reguler hover:shadow-lg transition-all"
                    >
                      Visit Site
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}