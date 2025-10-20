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

  const categories = ['All', 'HR', 'Marketing', 'Finance', 'Operations', 'Technology', 'Health', 'Education'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.data.category === selectedCategory;
    const matchesSearch = product.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.data.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Desktop Sidebar Filter */}
      <div className="lg:col-span-1 hidden lg:block">
        <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
          <h3 className="text-h4 font-bold mb-4">Filter Products</h3>
          
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
            />
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-h6 font-semibold mb-3 text-gray-700">Categories</h4>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all text-base ${
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

      {/* Mobile Filter */}
      <div className="lg:hidden col-span-1">
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <h3 className="text-h5 font-bold mb-4">Filter Products</h3>
          
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label htmlFor="category-select" className="block text-base font-semibold mb-2 text-gray-700">
              Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-base font-medium appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5rem'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200">
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
            <h3 className="text-h3 font-bold text-gray-400 mb-2">No products found</h3>
            <p className="text-base text-gray-500">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
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
                <div className="p-4 md:p-6">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                      {product.data.category}
                    </span>
                  </div>
                  
                  <h3 className="text-base md:text-h5 font-bold mb-2 group-hover:text-purple-600 transition-colors">
                    {product.data.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-3">
                    {product.data.description}
                  </p>

                  <div className="flex flex-col md:flex-row gap-2">
                    <a
                      href={`/products/${product.slug}`}
                      className="flex-1 text-center py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all text-xs md:text-sm"
                    >
                      Learn More
                    </a>
                    <a
                      href={product.data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-xs md:text-sm"
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