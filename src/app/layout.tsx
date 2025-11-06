import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Offers - عروض المتاجر",
  description: "أحدث عروض وكتالوجات المتاجر في مكان واحد",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${vazirmatn.variable} antialiased`}>

        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/"><h1 className="text-2xl font-bold text-gray-800">أسعار مصر</h1></Link>
              </div>
              <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2">الرئيسية</Link>
                <Link href="/offers" className="text-gray-700 hover:text-gray-900 px-3 py-2">العروض</Link>
              </div>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
