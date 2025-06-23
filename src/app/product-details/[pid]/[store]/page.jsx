import ProductDetails from '@/components/ProductDetails'; // This should be your client component

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const imagBaseUrl = 'https://employee.dealsfromamerica.com/uploads/products';

function isAsin(id) {
  if (/^\d+$/.test(id)) return false;
  return /[a-zA-Z]/.test(id) && /[0-9]/.test(id);
}

export async function generateMetadata({ params }) {
  const { pid,store } = params;
  const is_asin = isAsin(pid);
  const fetchUrl = is_asin
    ? `${baseUrl}/product_api/amazon/get-product-by-id.php?id=${pid}`
    : `${baseUrl}/product_api/get-product-by-id.php?id=${pid}`;

  const res = await fetch(fetchUrl, { cache: 'no-store' });
  const product = await res.json();

  const rawImage = is_asin ? product.image : `${imagBaseUrl}/${product.image}`;
  console.log(rawImage)

  const pageUrl =`https://www.spentaconsulting.com/product-details/${pid}/${store}`;

  return {
    title: product.name || 'Product Details',
    description: product.description || 'Explore product details and deals.',
    // metadataBase: new URL(baseUrl), // helps ensure relative links are resolved
    openGraph: {
      title: product.name || 'Product Details',
      description: product.description || 'latest deals on latest products at amazon,flipkart,myntra.',
      url: pageUrl,
      type: 'website',
      siteName: 'My Store', // Replace with your site name
      locale: 'en_US',
      images: [
        {
          url: rawImage,
          width: 400,
          height: 400,
          alt: product.name,
        },
      ],
    },
    icons: {
      icon: 'logo.png'
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [rawImage],
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
