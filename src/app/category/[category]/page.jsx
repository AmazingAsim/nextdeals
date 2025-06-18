'use client';

import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import AmazonCatagory from '@/components/AmazonCatagory';
import { useParams } from 'next/navigation';
export default function Category() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchUrl = `${baseUrl}/product_api/get-products.php`;
  const { category } = useParams();

  async function fetchProducts(newPage = page) {
    if (!hasMore && newPage !== 1) return;

    setLoading(true);
    try {
      let res = await fetch(`${fetchUrl}?category=${category}&limit=15&page=${newPage}`);
      let newProducts = await res.json();

      newProducts = newProducts.filter(item => item?.original_price > item.selling_price);

      if (newPage === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }

      setHasMore(newProducts.length === 10);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        fetchProducts();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="container my-5">
      <h3 className="display-6 mb-5">Showing results for {category}</h3>
      <AmazonCatagory category={category} />

      {loading && <p>Loading more products...</p>}
      <Footer />
    </div>
  );
}
