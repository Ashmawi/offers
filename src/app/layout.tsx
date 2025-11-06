import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://as3armasr.com";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "عروض المتاجر | أسعار مصر",
    template: "%s | أسعار مصر"
  },
  description: "أحدث عروض وكتالوجات وأسعار المتاجر في مكان واحد محدثة باستمرار",
  keywords: ["عروض", "كتالوج", "أسعار", "هايبر", "سوبر ماركت", "كارفور", "كازيون"],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteUrl,
    siteName: "أسعار مصر",
    title: "عروض المتاجر | أسعار مصر",
    description: "أحدث عروض وكتالوجات وأسعار المتاجر في مكان واحد",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=%D8%A3%D8%B3%D8%B9%D8%A7%D8%B1+%D9%85%D8%B5%D8%B1",
        width: 1200,
        height: 630,
        alt: "عروض المتاجر المصرية"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "عروض المتاجر | أسعار مصر",
    description: "أحدث عروض وكتالوجات وأسعار المتاجر في مكان واحد",
    images: [
      "https://via.placeholder.com/1200x630.png?text=%D8%A3%D8%B3%D8%B9%D8%A7%D8%B1+%D9%85%D8%B5%D8%B1"
    ]
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
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
