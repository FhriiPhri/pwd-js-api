export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <title>CRUD API Next.js</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}