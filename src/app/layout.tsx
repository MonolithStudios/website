import type { Metadata } from "next";
import { Nunito_Sans, League_Spartan } from 'next/font/google'
import "./globals.css";

const nunitoSans = Nunito_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700'],
    variable: '--font-body'
})

const leagueSpartan = League_Spartan({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-heading'
})

export const metadata: Metadata = {
  title: "Monolith Studios",
  description: "Develop boldly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${leagueSpartan.variable} ${nunitoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
