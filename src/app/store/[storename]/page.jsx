"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AmazonCard from "@/components/AmazonCard";



export default function StorePage() {
  const params = useParams();
  const storename = params.storename;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchUrl = `${baseUrl}/product_api/get-products.php`;

  async function fetchProducts(newPage = page) {
    if (!hasMore && newPage !== 1) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${fetchUrl}?store_name=${storename}&limit=10&page=${newPage}`
      );
      const newProducts = await res.json();

      if (newPage === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }

      setHasMore(newProducts.length === 10);
      setPage(newPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [storename]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="px-5">
      <h1 className="display-6 border-bottom border-3 border-primary mb-5 py-4">Latest Deals from {storename}</h1>
      <div className="row">
        {products.map((item, index) => (
          <div className="col-md-4" key={index}>
           <AmazonCard product={item} />
          </div>
        ))}
      </div>
      {loading && <p>Loading more products...</p>}
    </div>
  );
}
