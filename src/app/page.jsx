import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Carousel/>
      <h1 className="text-center mt-1 display-6 main-header">
        Best Deals in America & Discounts on Amazon,Walmart,Target,  on Latest Products like Phones, Laptops, Watches, Fashion, Electronics, Home Appliances
      </h1>
      <FeaturedProducts/>
    </main>
  );
}
