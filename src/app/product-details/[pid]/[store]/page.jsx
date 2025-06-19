import ProductDetails from '@/components/ProductDetails'; // This should be your client component

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const imagBaseUrl = 'https://dealsfromamerica.com/employee/uploads/products';

function isAsin(id) {
  if (/^\d+$/.test(id)) return false;
  return /[a-zA-Z]/.test(id) && /[0-9]/.test(id);
}

export async function generateMetadata({ params }) {
  const { pid } = params;
  const is_asin = isAsin(pid);

  const fetchUrl = is_asin
    ? `${baseUrl}/product_api/amazon/get-product-by-id.php?id=${pid}`
    : `${baseUrl}/product_api/get-product-by-id.php?id=${pid}`;

  const res = await fetch(fetchUrl, { cache: 'no-store' });
  const product = await res.json();

  const image = `${imagBaseUrl}/${product.image}`.replace(/ /g, '%20');
  const url = `${baseUrl}/product-details/${pid}/store`;

  return {
    title: product.name || 'Product Details',
    description: product.description || 'Explore product details and deals.',
    openGraph: {
      title: product.name || 'Product Details',
      description: product.description || '',
      url,
      type: 'website',
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [image],
    },
  };
}

export default async function Page({ params }) {
  const { pid, store } = params;
  const is_asin = isAsin(pid);

  const fetchUrl = is_asin
    ? `${baseUrl}/product_api/amazon/get-product-by-id.php?id=${pid}`
    : `${baseUrl}/product_api/get-product-by-id.php?id=${pid}`;

  let product = {};
  try {
    const res = await fetch(fetchUrl, { cache: 'no-store' });
    product = await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }

  return (
    <ProductDetails pid={pid} store={store} product={product} />
  );
}
