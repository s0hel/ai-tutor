import type { Metadata, Viewport } from "next";
import { Fredoka, Baloo_2 } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kip's Learning Club",
  description: "A friendly AI tutor for math and reading practice.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kip's Club",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#6c5ce7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} ${baloo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[image:radial-gradient(circle_at_top,_#fff_0%,_#fff9ec_45%)]">
        {children}
      </body>
    </html>
  );
}
