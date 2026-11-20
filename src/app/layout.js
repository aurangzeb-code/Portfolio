// Loads two fonts: one for big headings, one for normal text
import { Space_Grotesk, Inter, Caveat } from "next/font/google";
import "./globals.css";

// Heading font
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
// Body font
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
// Handwritten font for small personal notes
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

// Title and description shown in the browser tab / Google
export const metadata = {
  title: "Aurang Zeb | Software Builder",
  description: "Portfolio of Aurang Zeb - desktop apps, web apps and more.",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning hides the harmless warning caused by browser extensions
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}