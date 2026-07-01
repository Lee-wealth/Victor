import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Navil Job Connect',
  description: 'Find your dream job or hire top talent on Navil Job Connect',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-sm sticky top-0 z-40">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="text-2xl font-bold text-primary-700">Navil</div>
              <div className="flex gap-4">
                <a href="/" className="text-neutral-700 hover:text-primary-600">Home</a>
                <a href="/jobs" className="text-neutral-700 hover:text-primary-600">Jobs</a>
                <a href="/auth/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Sign In</a>
              </div>
            </nav>
          </header>
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="bg-neutral-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <p className="text-center text-neutral-400">&copy; 2024 Navil Job Connect. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
