'use client';

import React, { useEffect, useState } from 'react';
import AmazonCard from './AmazonCard';

export default function AmazonCatagory({ category }) {
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
      newProducts = newProducts.filter(item => item?.original_price > item.selling_price);

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
  }, [category]);

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
