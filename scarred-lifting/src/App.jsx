import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Reviews from './components/Reviews';
import FreeProgram from './components/FreeProgram';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
