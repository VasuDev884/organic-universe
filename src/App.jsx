import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar          from './components/Navbar';
import Footer          from './components/Footer';
import WhatsApp        from './components/WhatsApp';
import Cursor          from './components/Cursor';
import ScrollToTop     from './components/ScrollToTop';
import BackToTop       from './components/BackToTop';
import SplashScreen    from './components/SplashScreen';
import Home            from './pages/Home';
import About           from './pages/About';
import Services        from './pages/Services';
import Certifications  from './pages/Certifications';
import Clients         from './pages/Clients';
import Contact         from './pages/Contact';
import Gallery         from './pages/Gallery';
import Blog            from './pages/Blog';
import SuccessStories  from './pages/SuccessStories';
import NotFound        from './pages/NotFound';
import Admin           from './admin/Admin';
import './styles/globals.css';

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/"                element={<Home />} />
          <Route path="/about"           element={<About />} />
          <Route path="/services"        element={<Services />} />
          <Route path="/certifications"  element={<Certifications />} />
          <Route path="/clients"         element={<Clients />} />
          <Route path="/gallery"         element={<Gallery />} />
          <Route path="/blog"            element={<Blog />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="*"                element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function Layout() {
  return (
    <>
      <Cursor />
      <ScrollToTop />
      <Navbar />
      <main><AnimatedRoutes /></main>
      <Footer />
      <WhatsApp />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SplashScreen />
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/*"       element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
