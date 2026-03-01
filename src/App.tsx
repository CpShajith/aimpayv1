import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { useEffect, useState } from 'react';
import { SignIn } from './pages/SignIn';
import { ContactForm } from './pages/ContactForm';
import { HomePage } from './pages/HomePage';
import Home from './pages/Home';

// Product pages
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { SecurityPage } from './pages/SecurityPage';
import { ApiPage } from './pages/ApiPage';

// Company pages
import { AboutUsPage } from './pages/AboutUsPage';
import { CareersPage } from './pages/CareersPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

// Legal pages
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { CompliancePage } from './pages/CompliancePage';
import { useMediaQuery } from './hooks/useMediaQuery';

import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';
import './styles/globals.css';

export default function App() {
  const gradientRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (gradientRef.current) {
        gradientRef.current.style.background = `radial-gradient(circle 800px at ${e.clientX}px ${e.clientY}px, rgba(230, 81, 0, 0.15), transparent)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Scroll to top or to hash on route change
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: '#3D0F00' }}>
      {/* Animated gradient follow */}
      <div
        ref={gradientRef}
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 800px at 0px 0px, rgba(230, 81, 0, 0.15), transparent)`,
        }}
      />



      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {!['/signin'].includes(location.pathname) && (
          <Navigation
            onSignInClick={() => navigate('/signin')}
            onGetStartedClick={() => navigate('/contact')}
          />
        )}

        <main className="flex-grow">
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn onBack={() => navigate('/')} onGetStarted={() => navigate('/contact')} />} />
            <Route path="/contact-form" element={<ContactForm onBack={() => navigate('/')} />} />

            {/* Product */}
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/api" element={<ApiPage />} />

            {/* Company */}
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
          </Routes>
        </main>

        {!['/signin', '/contact'].includes(location.pathname) && <Footer />}
      </div>

    </div>
  );
}