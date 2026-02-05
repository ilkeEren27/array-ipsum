import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Array Ipsum - Generate Placeholder Arrays Instantly",
  description: "A simple tool to generate placeholder arrays of different data types (int, float, double, string, bool) for developers. Copy ready-to-use code snippets.",
  keywords: ["array", "generator", "placeholder", "lorem ipsum", "developer tools", "code generator"],
  authors: [{ name: "Array Ipsum" }],
  openGraph: {
    title: "Array Ipsum - Generate Placeholder Arrays Instantly",
    description: "Generate placeholder arrays of any data type with one click. Get code snippets for JavaScript, Python, Java, C#, and C++.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
