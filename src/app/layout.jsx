import { Inter } from "next/font/google";
import "./globals.css";
import '@/lib/fontawesome';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
import dynamic from 'next/dynamic';

const BootstrapClientLoader = dynamic(() => import('@/components/BootstrapClientLoader'), {
  ssr: false,
});
export const metadata = {
  title: "Deals From America || America,Shoping,Deals,Discounts",
  description: "best deals on goods in america on latest products from amazon,flipkart,myntra and more",
  icons: {
    icon: "logo.png",
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
      <body className={inter.className}>
        <BootstrapClientLoader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
