import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import MobileNavigation from "@/components/common/mobile-navigation";

import { cn } from "@/lib/utils";
import { WalletProvider } from "@/components/common/wallet.provider";
import { Toaster } from "@/components/ui/sonner";

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
          <div className="z-10 flex flex-col h-full">
            <div className="py-3 px-4 z-10 flex-grow overflow-y-auto">
              {children}
            </div>
            <div className="md:h-20 h-[35svh]"></div>
            <MobileNavigation />
          </div>
        </WalletProvider>
        <Toaster />
      </body>
    </html>
  );
}
