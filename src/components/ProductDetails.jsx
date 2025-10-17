'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ScrollView from '@/components/ScrollView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faWhatsapp, faTwitter, faTelegram,faReddit } from '@fortawesome/free-brands-svg-icons'
export default function ProductDetails({pid,store,product}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const [imageUrl, setImageUrl] = useState('');
  const currenturl = `${baseUrl}${pathname}`;

    function isAsin(id) {
    if (/^\d+$/.test(id)) return false;
    return (/[a-zA-Z]/.test(id) && /[0-9]/.test(id));
  }


  
  const is_asin = isAsin(pid);
  const imagBaseUrl = 'https://employee.dealsfromamerica.com/uploads/products';

  const discount =
    product.original_price !== 0
      ? ((product.original_price - product.selling_price) / product.original_price) * 100
      : 0;
  const formattedDiscount = discount.toFixed(2);
  const dealType = discount > 60 ? 'Excellent Deal' : discount > 30 ? 'Hot Deal' : '';
  const timeInEst = product.created_at
    ? new Date(product.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' })
    : '';


  const encodeSpacesInUrl = (url) => url.replace(/ /g, '%20');
   useEffect(()=>{
     
 if(is_asin){
     setImageUrl(product.image)
   }
   else{
     if(product.image.match(/^https?:\/\//)){
       setImageUrl(product.image)
     }
     else{
       i = encodeSpacesInUrl(`${imagBaseUrl}/${product.image}`);
       setImageUrl(i)
     }
   }
   },[product])

  return (
    <div>

    

      {/* Social Links */}
      <div className="d-flex gap-5 justify-content-end p-3 px-5">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${currenturl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
         <FontAwesomeIcon  icon={faFacebook} className="fs-1 text-primary" />
          
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${currenturl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} className="fs-1 text-info" />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `Check out this product: ${product.name}\n \n` +
              `Sale Price: *${product.currency === 'INR' ? '₹' : '$'}${product.selling_price}*\n` +
              `Original Price: *${product.currency === 'INR' ? '₹' : '$'}${product.original_price}*\n` +
              (store
                ? `https://dealsfromamerica.com/product-details/${pid}/${store}`
                : `https://dealsfromamerica.com/product-details/${pid}`)
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
         <FontAwesomeIcon icon={faWhatsapp} className="fs-1 text-success" />
        </a>
        <a
          href={`https://www.reddit.com/submit?url=${currenturl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faReddit} className="fs-1 text-danger" />
        </a>
        <a
          href={`https://telegram.me/share/url?url=${currenturl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
         <FontAwesomeIcon icon={faTelegram} className="fs-1 text-primary" />
        </a>
      </div>

      {/* Product Info */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={is_asin? product.image: imageUrl}
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
