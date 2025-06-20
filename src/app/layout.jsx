import { Inter } from "next/font/google";
import "./globals.css";
import '@/lib/fontawesome';
import Navbar from "@/components/Navbar";
import Script from "next/script";

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
      <head>
        {/* Google Analytics Script */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QK2R5LW2W1');
            `,
          }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-QK2R5LW2W1`}
          strategy="afterInteractive"
        />
      </head>

      <body className={inter.className}>
        <BootstrapClientLoader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
