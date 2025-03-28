import './globals.css';

export const metadata = {
  title: 'Juan Flores | Matrix Developer',
  description: 'Senior Full Stack Developer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}