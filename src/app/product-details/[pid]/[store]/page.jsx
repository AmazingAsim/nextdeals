'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScrollView from '@/components/ScrollView';

export default function ProductPage() {
  const { pid, store } = useParams();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [product, setProduct] = useState({});
  const is_asin = isAsin(pid);
  const imagBaseUrl = 'https://dealsfromamerica.com/employee/uploads/products';
  const fetchUrl = is_asin
    ? `${baseUrl}/product_api/amazon/get-product-by-id.php?id=${pid}`
    : `${baseUrl}/product_api/get-product-by-id.php?id=${pid}`;

  const discount =
    product.original_price !== 0
      ? ((product.original_price - product.selling_price) / product.original_price) * 100
      : 0;
  const formattedDiscount = discount.toFixed(2);
  const dealType = discount > 60 ? 'Excellent Deal' : discount > 30 ? 'Hot Deal' : '';
  const timeInEst = product.created_at
    ? new Date(product.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' })
    : '';

  function isAsin(id) {
    if (/^\d+$/.test(id)) return false;
    return /[a-zA-Z]/.test(id) && /[0-9]/.test(id);
  }

  const encodeSpacesInUrl = (url) => url.replace(/ /g, '%20');

  const fetchProduct = async () => {
    try {
      const res = await fetch(fetchUrl);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [fetchUrl]);

  useEffect(() => {
    if (product.image) {
      const encodedImageUrl = encodeSpacesInUrl(`${imagBaseUrl}/${product.image}`);
      const meta = document.querySelector('meta[property="og:image"]');
      if (meta) meta.setAttribute('content', encodedImageUrl);
    }
  }, [product]);

  useEffect(() => {
    if (product && product.name && product.image) {
      setTimeout(() => {
        window.prerenderReady = true;
      }, 500);
    }
  }, [product]);

  return (
    <div>
      <title>{`Deals From America - ${product.name}`}</title>
      {/* Social Links */}
      <div className="d-flex gap-5 justify-content-end p-3 px-5">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-facebook fs-4 text-primary"></i>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-twitter fs-4 text-info"></i>
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `Check out this product: ${product.name}\n` +
              `Sale Price: *${product.currency === 'INR' ? '₹' : '$'}${product.selling_price}*\n` +
              `Original Price: *${product.currency === 'INR' ? '₹' : '$'}${product.original_price}*\n` +
              (store
                ? `https://dealsfromamerica.com/product-details.php?id=${pid}&store=${store}`
                : `https://dealsfromamerica.com/product-details/${pid}`)
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-whatsapp fs-4 text-success"></i>
        </a>
        <a
          href={`https://www.reddit.com/submit?url=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-reddit fs-4 text-danger"></i>
        </a>
        <a
          href={`https://telegram.me/share/url?url=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-telegram fs-4 text-primary"></i>
        </a>
      </div>

      {/* Product Info */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={
                is_asin
                  ? product.image
                  : encodeSpacesInUrl(`${imagBaseUrl}/${product.image}`)
              }
              className="img-fluid rounded"
              alt={product.name}
              style={{ objectFit: 'cover', width: store ? '70%' : '100%' }}
            />
          </div>
          <div className="col-md-8">
            <h1>{product.name}</h1>
            <p>Category: {product.category}</p>
            <p>Store: {product.store_name || 'Amazon.com'}</p>
            <p>{store ? '' : `Posted on: ${timeInEst} EST`}</p>
            <p>{product.description}</p>
            <hr />
            <h4>
              <span>{formattedDiscount}% {dealType}</span><br />
              {product.selling_price} {product.currency}
            </h4>
            <i className="ms-3">
              <s>{product.original_price} {product.currency}</s>
            </i><br />
            <a href={product.product_link} target="_blank" rel="noreferrer" className="btn btn-primary">
              Buy Now
            </a>
          </div>
        </div>
      </div>

      {/* Related ScrollView */}
      <ScrollView filter="category" name={product.category} />
    </div>
  );
}
