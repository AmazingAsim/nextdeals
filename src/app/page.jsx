import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Carousel/>
      <FeaturedProducts/>
    </main>
  );
}
