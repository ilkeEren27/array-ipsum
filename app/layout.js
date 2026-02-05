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
  title: "Array Ipsum - Free Online Array Generator | Placeholder Arrays for Developers",
  description: "Generate placeholder arrays instantly with Array Ipsum. Create random integer, float, string, and boolean arrays. Get ready-to-use code snippets for JavaScript, Python, Java, C#, and C++. The best free array generator tool for developers.",
  keywords: [
    "array generator",
    "array ipsum",
    "placeholder array",
    "random array generator",
    "generate array online",
    "array creator",
    "test data generator",
    "mock data array",
    "dummy array generator",
    "lorem ipsum array",
    "developer tools",
    "code generator",
    "javascript array generator",
    "python array generator",
    "random integer array",
    "random string array",
    "boolean array generator",
    "float array generator",
    "programming array generator",
    "free array tool"
  ],
  authors: [{ name: "Array Ipsum", url: "https://array-ipsum.vercel.app/" }],
  creator: "Array Ipsum",
  publisher: "Array Ipsum",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Array Ipsum - Free Online Array Generator",
    description: "Generate placeholder arrays of any data type with one click. Get ready-to-use code snippets for JavaScript, Python, Java, C#, and C++.",
    url: "https://array-ipsum.vercel.app/",
    siteName: "Array Ipsum",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Array Ipsum - Free Online Array Generator",
    description: "Generate placeholder arrays instantly. Create random integer, float, string, and boolean arrays with code snippets for multiple languages.",
    creator: "@arrayipsum",
  },
  alternates: {
    canonical: "https://array-ipsum.vercel.app/",
  },
  category: "Developer Tools",
  applicationName: "Array Ipsum",
  other: {
    "google-site-verification": "Usgxt7BcTXxmsQiDK0eRpqMwnO6dvCZH",
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
