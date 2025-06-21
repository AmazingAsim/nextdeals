
import Footer from '@/components/Footer';
import AmazonCatagory from '@/components/AmazonCatagory';


export async function generateMetadata({ params }) {
  const { category } = params
  return {
    title: `Top deals on ${decodeURIComponent(category)}`,
    description: `latest deals on ${decodeURIComponent(category)} at amazon,flipkart,myntra`,
    icons: {
      icon: "/logo.png"
    }
  }
}

export default function Category({params}) {
  const { category } = params
  return (
    <div className="container my-5">
      <AmazonCatagory category={category} />
      <Footer />
    </div>
  );
}
