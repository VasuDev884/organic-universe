import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'fixed', inset: 0, background: '#040D05', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Ambient rings */}
          {[1, 2, 3].map(i => (
            <motion.div key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0, 0.08] }}
              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
              style={{ position: 'absolute', width: i * 200, height: i * 200, borderRadius: '50%', border: '1px solid rgba(139,195,74,0.3)', pointerEvents: 'none' }}
            />
          ))}

          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt="Organic Universe"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 100, width: 'auto', marginBottom: 24, filter: 'drop-shadow(0 0 30px rgba(139,195,74,0.4))' }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ fontFamily: 'Cormorant Garamond', fontSize: 28, color: 'white', fontWeight: 600, letterSpacing: '1px' }}
          >
            Organic Universe
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ color: 'rgba(139,195,74,0.7)', fontSize: 11, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginTop: 6 }}
          >
            Consultancy
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 180 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 2, background: 'linear-gradient(90deg, #2E7D32, #8BC34A, #C9A84C)', borderRadius: 1, marginTop: 36 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
