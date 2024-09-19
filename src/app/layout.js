import { Inter } from "next/font/google";
import "./globals.css";
import "./page.css";
import Header from "@/Widgets/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "U Type",
  description: "A simple wpm calculation software and typing practicer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A simple wpm calculation software and typing practicer."
        />
        <meta
          name="keywords"
          content="utype, typing test, wpm, wpm calculator, typing practice"
        />
        <meta property="og:site_name" content="U Type"></meta>
        <meta property="og:title" content="U Type" />
        <meta
          property="og:description"
          content="A simple wpm calculation software and typing practicer."
        />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://utype-gilt.vercel.app/" />
        <meta name="twitter:card" content="U Type" />
        <meta name="twitter:title" content="U Type" />
        <meta
          name="twitter:description"
          content="U Type - Improve your WPM"
        />
        <meta name="twitter:image" content="/favicon.png" />
        <link rel="icon" type="image/png" href="favicon.ico" />
        <link rel="canonical" href="https://utype-gilt.vercel.app/" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
