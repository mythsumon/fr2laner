import type { Metadata } from "next";
import { LangProvider } from "@/providers/LangProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { HomeDataProvider } from "@/contexts/HomeDataContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "FreelanceMarket",
  description: "Find the perfect freelancer for your next project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <LangProvider>
            <HomeDataProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </HomeDataProvider>
          </LangProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
