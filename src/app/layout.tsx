import '../styles/globals.css';
import { Metadata } from 'next';
import AppTracing from '@/components/app/AppTracing';
import GlobalProviders from '@/components/app/GlobalProviders';

// TODO: update this metadata
export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Kanit:wght@300;400;500&family=Sarabun:wght@300;700&&family=Noto+Sans&family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppTracing>
          <GlobalProviders>
            {children}
          </GlobalProviders>
        </AppTracing>
      </body>
    </html>
  );
}
