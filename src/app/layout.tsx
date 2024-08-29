import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import MobileNavigation from "@/components/common/mobile-navigation";

import { cn } from "@/lib/utils";
import { WalletProvider } from "@/components/common/wallet.provider";
import { Toaster } from "@/components/ui/sonner";
import { AptosProvider } from "@/contexts/aptos-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
      />
      <body
        className={cn(
          inter.className,
          "h-screen  overflow-hidden bg-zinc-100 max-w-[600px] m-auto"
        )}
      >
        {/* <FlickeringBackground /> */}
        <WalletProvider
        // plugins={wallets}
        >
          <AptosProvider>
            <div className="z-10 flex flex-col h-full">
              <div className="py-3 px-4 z-10 flex-grow overflow-hidden">
                {children}
              </div>
              <div className="h-20"></div>
              <MobileNavigation />
            </div>
          </AptosProvider>
        </WalletProvider>
        <Toaster />
      </body>
    </html>
  );
}
