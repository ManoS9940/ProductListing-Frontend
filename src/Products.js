import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = ({ token, setView }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://productlist-backend-zb7k.onrender.com/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [token]);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const includesCategory = category === 'All' || product.category === category;
    const includesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return includesCategory && includesSearchTerm;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className="products-container">
    <h1 className="mt-3">Product Listing</h1>

    {/* Filter Controls */}
    <div className="row mt-3">
      <div className="col-md-4">
        <label>Category:</label>
        <select className="form-control" onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Accessories">Accessories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Footwear">Footwear</option>
            <option value="Home Appliance">Home Appliance</option>
          {/* Add more categories */}
        </select>
      </div>
      <div className="col-md-4">
        <label>Search:</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products"
        />
      </div>
      <div className="col-md-4">
        <label>Sort Order:</label>
        <select className="form-control" onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </div>

    {/* Product List */}
    <div className="row mt-3">
      {sortedProducts.map((product) => (
        <div key={product.id} className="col-md-4">
          <div className="card mb-4">
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="card-text">
                <strong>Price:</strong> ${product.price}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Logout Button */}
    <button className="btn btn-primary" onClick={() => setView('login')}>
      Logout
    </button>
  </div>
  );
};

export default Products;
