import LayOut from "@/Layout/layout";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <LayOut>{children}</LayOut>
      </body>
    </html>
  );
}
