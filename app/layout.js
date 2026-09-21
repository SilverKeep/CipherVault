import './styles/global.css';

export const metadata = {
  title: {
    default: 'Science Olympiad Codebusters Practice | Ciphervault',
    template: '%s | Ciphervault',
  },
  description: 'Practice Science Olympiad Codebusters ciphers with focused puzzles, solving tools, and progress stats.',
  icons: {
    icon: '/new-image.png',
    shortcut: '/new-image.png',
    apple: '/new-image.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}