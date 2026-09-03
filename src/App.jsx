import { AppProvider } from "./context/AppContext";
import BackgroundScene from "./components/BackgroundScene";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Teaser from "./components/Teaser";
import BookingWizard from "./components/wizard/BookingWizard";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  return (
    <AppProvider>
      <BackgroundScene />
      <Navbar />
      <Hero />
      <Teaser />
      <BookingWizard />
      <Reviews />
      <Footer />
      <WhatsAppFloat />
    </AppProvider>
  );
}
