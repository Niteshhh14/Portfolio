import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nitesh Reddy | Systems & Automation Portfolio",
  description: "Personal portfolio of Nitesh Reddy, exhibiting systems exploration, robotics automation, machine learning research, and full-stack development. Recruiter-ready, high-performance UI.",
  keywords: ["Nitesh Reddy", "Systems Engineering", "Automation", "Embedded Systems", "Machine Learning", "Anurag University", "Developer Portfolio"],
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full scroll-smooth`}
    >
      <body className="bg-bg-primary text-text-primary font-sans min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
