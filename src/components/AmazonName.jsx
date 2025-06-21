'use client'; // Required for client-side hooks and browser APIs

import { useEffect, useState } from "react";

import AmazonCard from "./AmazonCard";
export default function AmazonName(props) {
  const { productname } = props;
  const [discountFilter, setDiscountFilter] = useState(0);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchUrl = `${baseUrl}/product_api/amazon/fetch_products.php`;

  // Fetch products
  const fetchProducts = async (newPage = page) => {
    if (!hasMore && newPage !== 1) return;
    setLoading(true);
    
    try {
      const res = await fetch(
        `${fetchUrl}?&limit=50&page=${newPage}&name=${encodeURIComponent(productname)}`,
        { method: "GET", mode: "cors" }
      );
      
      let newProducts = await res.json();
      newProducts = newProducts.filter((item) => {
  const discount = ((item.original_price - item.selling_price) / item.original_price) * 100;
  return item.original_price > item.selling_price && discount >= discountFilter;
});


      setProducts(prev => newPage === 1 ? newProducts : [...prev, ...newProducts]);
      setHasMore(newProducts.length >= 1);
      setPage(newPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and reset when productname changes
  useEffect(() => {
    fetchProducts(1);
  }, [productname, discountFilter]);

  // Infinite Scroll Detection
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, productname]);

  return (
    <div className="container mt-3">
      <div className="containe my-5">
        <div className="d-flex justify-content-between align-items-center">
      <h3 className="display-6">Top deals on {productname}</h3>
           <div className="d-flex gap-3 ms-5 align-items-center">
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
        <div className="row">
          {products.map((item, index) =>{

            return (
            <div className="col-12 col-sm-6 col-md-3" key={`${item.asin || index}-${index}`}>
             
              <AmazonCard product={item} />
            </div>
          )
          })}
        </div>  
      </div>
      {loading && <p className="text-center py-3">Loading more products...</p>}
    </div>
  );
}