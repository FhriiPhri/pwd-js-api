export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <title>Test Ajah</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-6 mb-2">Welcome To My Next App 👋👋</h1>
      <p className="text-1xl font-bold text-center text-gray-800">By RiiDev</p>

      {children}
      </body>
    </html>
  );
}