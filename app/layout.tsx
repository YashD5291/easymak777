import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EASYMAK777',
  description: 'Senior Full Stack Developer Portfolio',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
    other: [
      { 
        rel: 'manifest', 
        url: '/favicon/site.webmanifest' 
      }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}