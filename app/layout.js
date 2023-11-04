import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Şarj İstasyonları",
  description:
    "Açık Veri Portalları üzerinden sunulan akülü tekerlekli sandalye şarj istasyonlarını harita üzerinde gösteren web uygulaması. Tuzla Belediyesi Açık Veri Portalı, Kocaeli Büyükşehir Belediyesi Açık Veri Portalı, Gaziantep Büyükşehir Belediyesi Açık Veri Portalı ve İzmir Büyükşehir Belediyesi Açık Veri Portalı tarafından sağlanan veriler kullanılmıştır.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
