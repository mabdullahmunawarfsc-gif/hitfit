import Navbar from '../components/public/Navbar';
import Hero from '../components/public/Hero';
import About from '../components/public/About';
import Services from '../components/public/Services';
import PlansSection from '../components/public/PlansSection';
import Trainers from '../components/public/Trainers';
import BMI from '../components/public/BMI';
import Timetable from '../components/public/Timetable';
import Gallery from '../components/public/Gallery';
import Testimonials from '../components/public/Testimonials';
import Contact from '../components/public/Contact';
import Footer from '../components/public/Footer';

export default function Home() {
  return (
    <div className="bg-base text-ink">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <PlansSection />
      <Trainers />
      <BMI />
      <Timetable />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
