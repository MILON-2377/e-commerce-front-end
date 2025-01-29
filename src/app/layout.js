import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata = {
  title: "LuxeCarat",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <div>
            <Navbar />
          </div>
          {children}

          {/* footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
