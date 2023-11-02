import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Şarj İstasyonları",
  description:
    "Açık Veri Portalları üzerinden sunulan akülü tekerlekli sandalye şarj istasyonlarını harita üzerinde gösteren web uygulaması.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
