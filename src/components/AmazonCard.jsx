'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faWhatsapp, faTwitter, faTelegram,faReddit } from '@fortawesome/free-brands-svg-icons'

export default function AmazonCard({ product }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const {
    name,
    selling_price,
    original_price,
    currency,
    product_link,
    description,
    image,
    asin,
    created_at,
    id,
  } = product;

  const discount = (((original_price - selling_price) / original_price) * 100);
  const formattedDiscount = discount.toFixed(2);
  const dealType = discount > 60 ? 'Excellent Deal' : discount > 30 ? 'Hot Deal' : '';
  const shortDescription =
    description.length > 100 ? description.slice(0, 100) + '...' : description;
  const timeInEst = new Date(created_at).toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });

  const imagBaseUrl = 'https://employee.dealsfromamerica.com/uploads/products';

  const handleCardClick = () => {
    router.push(`/product-details/${asin ? asin : id}/amazon`);
  };

  return (
    <div
      className="card mb-3 shadow-sm"
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <div className="position-absolute top-0 end-0 text-white px-2 py-1">
        {dealType && (
          <span className={`text-dark badge bg-${discount > 60 ? 'success' : 'warning'}`}>
            {dealType}
          </span>
        )}
      </div>
      <img
        src={asin ? image : `${imagBaseUrl}/${image}`}
        className="img-fluid rounded"
        alt={`${imagBaseUrl}/${image}`}
        style={{ maxHeight: '200px', objectFit: 'contain', width: '100%' }}
      />

      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text text-muted">
          {expanded ? description : shortDescription}
          {description.length > 100 && (
            <button
              className="btn btn-link p-0 ms-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click
                setExpanded(!expanded);
              }}
            >
              {expanded ? 'View Less' : 'View More'}
            </button>
          )}
        </p>

        {selling_price && (
          <div>
            <p className="fs-4">
              <b className="text-success">
                {formattedDiscount !== 'NaN' && formattedDiscount !== '0.00'
                  ? `-${formattedDiscount}%`
                  : ''}
              </b>
              <i className="ms-3">
                {currency === 'INR' ? '₹' : '$'}
                {selling_price}
              </i>
            </p>
            <p className="text-muted fs-6">
              <small>
                MRP: <s>{currency === 'INR' ? '₹' : '$'}{original_price}</s>
              </small>
            </p>
          </div>
        )}

        <p className="card-text">
          <small className="text-muted">Store: Amazon.com</small>
          <br />
          <small className="text-muted">
            Posted At: <span className="text-primary">{timeInEst} EST</span>
          </small>
        </p>
      </div>

      <div className="card-footer d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${product_link}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
           <FontAwesomeIcon icon={faFacebook} className="fs-4 text-primary" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${product_link}&text=${product_link}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
           <FontAwesomeIcon icon={faTwitter} className="fs-4 text-info" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `Check out this product: ${name} \n \n  Sale Price: *${selling_price}*\n Original Price: *${original_price}*\n https://dealsfromamerica.com/product-details/${asin}/amazon\n`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
           <FontAwesomeIcon icon={faWhatsapp} className="fs-4 text-success" />
          </a>
          <a
            href={`https://www.reddit.com/submit?url=${product_link}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon icon={faReddit} className="fs-4 text-danger" />
          </a>
          <a
            href={`https://telegram.me/share/url?url=${product_link}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon icon={faTelegram} className="fs-4 text-primary" />
          </a>
        </div>

        <a
          href={product_link}
          className="btn btn-primary btn-sm"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}
