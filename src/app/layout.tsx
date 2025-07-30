import "./globals.css";
import { DM_Sans } from "next/font/google";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  // weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="bg-[#070815] text-white">
        <script
          async
          defer
          src="https://static.cdn.prismic.io/prismic.js?new=true&repo=landing-ai"
        ></script>
        <Header />
        {children}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
