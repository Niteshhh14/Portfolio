import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nitesh's Portfolio",
  description: "Personal portfolio of Nitesh Reddy.",
  keywords: ["Nitesh Reddy", "Developer Portfolio"],
  authors: [{ name: "Nitesh Reddy" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth`}
    >
      <body className="bg-bg-primary text-text-primary font-sans min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
