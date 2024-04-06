import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { RoomContextProvider } from "@/components/providers/RoomContextProvider";
import { SecretcodeContextProvider } from "@/components/providers/SecretcodeContextProvider";

export const metadata: Metadata = {
  title: "Codershouse",
  icons: {
    icon: ["/chat.png"],
    apple: ["/chat.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <RoomContextProvider>
            <SecretcodeContextProvider>{children}</SecretcodeContextProvider>
          </RoomContextProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
