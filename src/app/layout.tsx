import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import { ModeToggle } from "~/components/theme-toggle";

const poppinsSans = Poppins({
  subsets: ["latin"],
  weight: '500',
  variable: "--font-poppins-sans"
});

const interSans = Inter({
  subsets: ['latin'],
  variable: "--font-inter-sans"
})


export const metadata: Metadata = {
  title: "Contabilidade.com",
  description: "Uma descrição",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppinsSans.className} ${interSans.className} antialiased`}
      >
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModeToggle />        
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
