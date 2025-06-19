import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Carousel/>
      <h1 className="text-center mt-5" style={{fontSize:"20px"}}>
        Best Deals in America & Discounts on Amazon, Flipkart, Myntra on Latest Products like Phones, Laptops, Watches, Fashion, Electronics, Home Appliances
      </h1>
      <FeaturedProducts/>
    </main>
  );
}
