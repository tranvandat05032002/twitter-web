import "./globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Roboto } from "next/font/google";
import QueryClientLayoutProvider from "./QueryClientProvider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning={true}>
        <QueryClientLayoutProvider>
          {children}
          <ToastContainer />
        </QueryClientLayoutProvider>
      </body>
    </html>
  );
}
