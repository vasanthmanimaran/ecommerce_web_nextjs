import "./globals.css";
import Footer from "./common/navbar/footer";
import Navbar from "./common/navbar/components/navbar";

export default function Home({ children }) {
  const shouldHideNavbarFooter = false; // Change this logic if needed

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <nav>
          <Navbar />
        </nav>
        <main className={`flex-grow relative ${shouldHideNavbarFooter ? 'mt-0' : '-mt-0'}`}>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}