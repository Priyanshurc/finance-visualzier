import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Finance Visualizer',
  description: 'Track your expenses and budgets',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="p-4 max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
