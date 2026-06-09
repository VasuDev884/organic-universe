import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#040D05', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 80, marginBottom: 24 }}
        >🌿</motion.div>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(80px, 15vw, 160px)', color: 'rgba(139,195,74,0.15)', fontWeight: 700, lineHeight: 1, marginBottom: -20 }}>404</h1>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px, 4vw, 48px)', color: 'white', marginBottom: 16 }}>Page Not Found</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 40, maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Looks like this page has gone organic and returned to nature. Let's get you back on track.
        </p>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: 'white', padding: '14px 32px', borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 28px rgba(201,168,76,0.35)' }}>
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
