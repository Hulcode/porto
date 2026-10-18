import "./global.css";

export const metadata = {
  title: "Al-Hassan Soliman | Full-Stack Developer",
  description:
    "Portfolio of Al-Hassan Soliman, a full-stack developer building thoughtful web and desktop applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}