import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400","500","700"], // add weights you need
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task management system is a system add list all your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${roboto.className} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
