'use client';

import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import AmazonCard from './AmazonCard';

export default function FeaturedProducts() {
  const [discountFilter, setDiscountFilter] = useState(0);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchUrl = `${baseUrl}/product_api/amazon/fetch_products.php`;

  const fetchProducts = async (newPage = page) => {
    if (!hasMore && newPage !== 1) return;
    setLoading(true);
    try {
      const res = await fetch(`${fetchUrl}?limit=50&page=${newPage}`, {
        method: 'GET',
        mode: 'cors',
      });
      let newProducts = await res.json();

      // Filter deals where selling_price < original_price
      newProducts = newProducts.filter((item) => {
        const discount = ((item.original_price - item.selling_price) / item.original_price) * 100;
        return item.original_price > item.selling_price && discount >= discountFilter;
      });

      if (newPage === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }

      setHasMore(newProducts.length >= 1);
      setPage(newPage + 1);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(1);
  }, [discountFilter]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 400 &&
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
    <div className="container-fluid mt-3">
      {/* SEO Metadata (Next.js Head component) */}
      <Head>
        <title>Deals In America</title>
        <meta name="description" content="Top Amazon deals in America" />
      </Head>



      <div className="">
        <h2 className="border border-0 border-bottom border-3 border-primary fw-bold py-2 ms-5" style={{ width: 'fit-content' }}>
          Top Deals On Amazon
        </h2>

        <div className="d-flex gap-3 ms-5 align-items-center">
          <label htmlFor="discount-filter" className="form-label fs-5 mt-2  fw-bold">Filter by Discount:</label> <br />
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(0)} >All</button>
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(10)}>10%</button>
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(20)}>20%</button>
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(30)}>30%</button>
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(40)}>40%</button>
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(50)}>50%</button>
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(60)}>60%</button>
          {/* <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(70)}>70%</button>
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(80)}>80%</button>
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(90)}>90%</button>
          <button className='btn btn-outline-primary rounded-5' onClick={() => setDiscountFilter(100)}>100%</button> */}
        </div>
      </div>

      <div className="container-fluid my-5">
        <div className="row">
          {products.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-3" key={index}>
              <AmazonCard product={item} />
            </div>
          ))}
        </div>
      </div>

      {loading && <p className="text-center">Loading more products...</p>}
    </div>
  );
}
