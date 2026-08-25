

import "./globals.css";

export const metadata = { title: "A&A GUITAR STORE", description: "あなたの音楽に、長く寄り添う一本を。" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
