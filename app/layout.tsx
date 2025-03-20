import type { Metadata } from "next";
import { Caveat_Brush, Inter, Overpass } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import Header from "./_components/Header";
import Toast from "./_components/toast/Toast";
import ToastContainer from "./_components/toast/ToastContainer";

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
});

const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  variable: "--font-caveat-brush",
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: "800",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Check It - Todo App",
  description:
    "Check it, it's a task management with minimal design & functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${overpass.variable} ${caveatBrush.variable} ${inter.variable} antialiased`}
      >
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
