import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ModalContextProvider } from "@/context/modal.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Applicant Tracking System</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400;700&family=Inter:wght@100;300;400;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative">
        <ModalContextProvider>
          {children}
          <div id="portal"></div>
        </ModalContextProvider>
      </body>
    </html>
  );
}
