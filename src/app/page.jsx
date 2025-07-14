import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel";
import FeaturedProducts from "@/components/FeaturedProducts";

export async function generateMetadata({ params }) {
  return {
    title: `Deals of America || Deals from america, coupon codes for amazon`,
    description: `latest deals at amazon,wallmart and more`,
    icons: {
      icon: "/logo.png"
    },
     alternates: {
      canonical: "https://dealsfromamerica.com",
    }
  }
}

export default function Home() {
  return (
    <main>
      <Carousel/>
      <div className="container">
      <h1 className="text-center mt-1 fs-6 main-header text-primary">
      Deals of America || Deals from america, coupon codes for amazon
      </h1>
      </div>
      <FeaturedProducts/>
    </main>
  );
}
