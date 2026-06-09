import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function WhatsApp() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="https://wa.me/919736419705?text=Hi%2C%20I%20want%20to%20know%20more%20about%20organic%20certification."
      target="_blank" rel="noreferrer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 2000, display: 'flex', alignItems: 'center', gap: 10, background: '#25D366', color: 'white', padding: hovered ? '14px 22px 14px 18px' : '16px', borderRadius: 100, fontSize: 22, boxShadow: '0 8px 32px rgba(37,211,102,0.45)', transition: 'padding 0.3s cubic-bezier(0.22,1,0.36,1)' }}
    >
      💬
      <AnimatePresence>
        {hovered && (
          <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}
            style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', fontFamily: 'Outfit' }}>
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
