'use client';

import React, { useEffect, useState } from 'react';
import AmazonCard from './AmazonCard';

export default function AmazonCatagory({ category }) {
  const [discountFilter, setDiscountFilter] = useState(0);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchUrl = `${baseUrl}/product_api/amazon/fetch_products.php`;

  // Fetch products
  async function fetchProducts(newPage = page) {
    if (!hasMore && newPage !== 1) return;

    setLoading(true);
    try {
      const res = await fetch(`${fetchUrl}?limit=50&page=${newPage}&category=${category}`, {
        method: 'GET',
        mode: 'cors',
      });

      let newProducts = await res.json();
      newProducts = newProducts.filter((item) => {
        const discount = ((item.original_price - item.selling_price) / item.original_price) * 100;
        return item.original_price > item.selling_price && discount >= discountFilter;
      });

      if (newPage === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }

      setHasMore(newProducts.length >= 1);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  }

  // Fetch on category change
  useEffect(() => {
    fetchProducts(1);
  }, [category, discountFilter]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 &&
        hasMore &&
        !loading
      ) {
        fetchProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, category]);

  return (
    <div className="container-fluid mt-3">
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className="display-6">Showing results for {decodeURIComponent(category)}</h3>
        <div className="d-flex align-items-center">
          <label htmlFor="discount-filter" className="form-label fw-bold">Filter by Discount:</label>
          <select
            id="discount-filter"
            className="form-select w-auto"
            onChange={(e) => {
              setDiscountFilter(Number(e.target.value));
              fetchProducts(1); // reset fetch on filter change
            }}
          >
            <option value="0">All</option>
            <option value="10">10% or more</option>
            <option value="20">20% or more</option>
            <option value="30">30% or more</option>
            <option value="40">40% or more</option>
            <option value="50">50% or more</option>
            <option value="60">60% or more</option>
          </select>
        </div>
      </div>
      <hr />

      <div className="container-fluid my-5">
        <div className="row">
          {products.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-3" key={index}>
              <AmazonCard product={item} />
            </div>
          ))}
        </div>
      </div>
      {loading && <p>Loading more products...</p>}
    </div>
  );
}
