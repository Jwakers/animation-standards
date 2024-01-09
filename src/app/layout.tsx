import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Provider from "./providers";

const poppins = Poppins({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animations standards",
  description: "Animations standards and documentation for UNRVLD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
