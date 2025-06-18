'use client'; // Ensures this runs as a client component in Next.js App Router

import React, { useEffect, useState } from 'react';
import AmazonCard from './AmazonCard';

export default function ScrollView({ name, filter }) {
  const [amazonData, setAmazonData] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const amazonFetchUrl = `${baseUrl}/product_api/amazon/fetch_products.php`;

  async function getAmazonData() {
    let searchUrl = '';

    if (filter === 'name') {
      searchUrl = `${amazonFetchUrl}?limit=10&name=${name}`;
    } else if (filter === 'category') {
      searchUrl = `${amazonFetchUrl}?limit=10&category=${name}`;
    }

    try {
      const res = await fetch(searchUrl);
      const data = await res.json();
      setAmazonData(data);
    } catch (error) {
      console.error('Error fetching Amazon data:', error);
    }
  }

  useEffect(() => {
    getAmazonData();
  }, [name, filter]);

  return (
    <div className="container-fluid px-5 my-2">
      <h2 className="border border-0 border-bottom border-3 border-primary fw-bold py-2" style={{ width: 'fit-content' }}>
        Grab Latest deals on {name}
      </h2>
      <div className="row">
        {amazonData.map((item, index) => (
          <div className="col-md-3" key={index}>
            <AmazonCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
