import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { path: '/', label: 'Home' },
  {
    label: 'Company', children: [
      { path: '/about',   label: 'About Us',        icon: '👥' },
      { path: '/gallery', label: 'Gallery',          icon: '🖼️' },
      { path: '/blog',    label: 'Blog & Resources', icon: '📝' },
    ],
  },
  {
    label: 'Services', children: [
      { path: '/services',        label: 'All Services',    icon: '🌿' },
      { path: '/certifications',  label: 'Standards',       icon: '🏆' },
      { path: '/success-stories', label: 'Success Stories', icon: '⭐' },
    ],
  },
  { path: '/clients', label: 'Clients' },
  { path: '/contact', label: 'Contact' },
];

function DropdownMenu({ items, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: 20, padding: '10px 8px', boxShadow: '0 20px 60px rgba(15,28,16,0.18)', border: '1px solid #D4E8D4', minWidth: 220, zIndex: 200 }}
        >
          <div style={{ position: 'absolute', top: -6, left: '20px', width: 12, height: 12, background: 'white', border: '1px solid #D4E8D4', borderBottom: 'none', borderRight: 'none', rotate: '45deg' }} />
          {items.map(item => (
            <Link key={item.path} to={item.path}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, color: '#0F1C10', fontSize: 14, fontWeight: 500, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F0F7EE'; e.currentTarget.style.color = '#2E7D32'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0F1C10'; }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown]   = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdown(null); }, [location]);

  const solid = scrolled || !isHome;

  const openDropdown = (label) => {
    clearTimeout(timeoutRef.current);
    setDropdown(label);
  };
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setDropdown(null), 120);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '0 40px',
          background: solid ? 'rgba(247,250,245,0.96)' : 'transparent',
          backdropFilter: solid ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: solid ? '1px solid rgba(212,232,212,0.7)' : 'none',
          boxShadow: solid ? '0 4px 24px rgba(46,125,50,0.07)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>

          {/* LOGO */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <motion.img
              src="/logo.png" alt="Organic Universe"
              whileHover={{ scale: 1.06, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 400 }}
              style={{ height: 54, width: 'auto', objectFit: 'contain', filter: solid ? 'none' : 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}
            />
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: 19, color: solid ? '#1B5E20' : 'white', lineHeight: 1, letterSpacing: '-0.2px', transition: 'color 0.4s' }}>
                Organic Universe
              </div>
              <div style={{ fontSize: 9, color: solid ? '#8BC34A' : 'rgba(255,255,255,0.75)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, transition: 'color 0.4s' }}>
                Consultancy
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="desktop-nav">
            {NAV.map(item => {
              if (item.children) {
                const isActive = item.children.some(c => location.pathname === c.path);
                return (
                  <div key={item.label}
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={closeDropdown}
                    style={{ position: 'relative' }}
                  >
                    <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 16px', borderRadius: 100, fontSize: 14, fontWeight: 500, color: isActive ? '#2E7D32' : (solid ? '#516752' : 'rgba(255,255,255,0.9)'), background: isActive ? (solid ? 'rgba(46,125,50,0.1)' : 'rgba(255,255,255,0.15)') : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Outfit', transition: 'color 0.3s, background 0.3s' }}>
                      {item.label}
                      <motion.span animate={{ rotate: dropdown === item.label ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-block', fontSize: 10, opacity: 0.6 }}>▾</motion.span>
                    </button>
                    <DropdownMenu items={item.children} visible={dropdown === item.label} />
                  </div>
                );
              }
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}
                  style={{ position: 'relative', padding: '8px 16px', borderRadius: 100, fontSize: 14, fontWeight: 500, color: active ? '#2E7D32' : (solid ? '#516752' : 'rgba(255,255,255,0.9)'), background: active ? (solid ? 'rgba(46,125,50,0.1)' : 'rgba(255,255,255,0.15)') : 'transparent', transition: 'color 0.3s, background 0.3s', textDecoration: 'none' }}>
                  {active && (
                    <motion.div layoutId="nav-pill"
                      style={{ position: 'absolute', inset: 0, background: solid ? 'rgba(46,125,50,0.1)' : 'rgba(255,255,255,0.15)', borderRadius: 100 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                </Link>
              );
            })}
            <motion.a href="tel:+919736419705"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(46,125,50,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', color: 'white', padding: '10px 24px', borderRadius: 100, fontSize: 13, fontWeight: 600, marginLeft: 12, boxShadow: '0 4px 16px rgba(46,125,50,0.3)', textDecoration: 'none' }}>
              📞 Call Now
            </motion.a>
          </div>

          {/* HAMBURGER */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 8 }}>
            {[0,1,2].map(i => (
              <motion.span key={i}
                animate={mobileOpen ? { rotate: i===0?45:i===2?-45:0, y: i===0?7:i===2?-7:0, opacity: i===1?0:1 } : { rotate:0, y:0, opacity:1 }}
                style={{ display: 'block', width: 24, height: 2, background: solid ? '#1B5E20' : 'white', borderRadius: 2, transformOrigin: 'center' }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', top: 80, left: 0, right: 0, zIndex: 999, background: 'rgba(247,250,245,0.98)', backdropFilter: 'blur(20px)', padding: '20px 24px 32px', borderBottom: '1px solid #D4E8D4', boxShadow: '0 8px 40px rgba(46,125,50,0.1)', overflowY: 'auto', maxHeight: 'calc(100vh - 80px)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #E8F5E9' }}>
              <img src="/logo.png" alt="Logo" style={{ height: 36 }} />
              <span style={{ fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: 16, color: '#1B5E20' }}>Organic Universe</span>
            </div>

            {NAV.map((item, i) => (
              <motion.div key={item.label || item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                {item.children ? (
                  <div>
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', fontSize: 22, fontFamily: 'Cormorant Garamond', fontWeight: 600, color: '#0F1C10', borderBottom: '1px solid #E8F5E9', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid #E8F5E9', paddingBottom: 13 }}>
                      {item.label}
                      <motion.span animate={{ rotate: mobileExpanded === item.label ? 180 : 0 }} style={{ fontSize: 14, color: '#8BA88B' }}>▾</motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden', paddingLeft: 16 }}>
                          {item.children.map(child => (
                            <Link key={child.path} to={child.path} onClick={() => setMobileOpen(false)}
                              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', fontSize: 17, fontFamily: 'Cormorant Garamond', color: location.pathname === child.path ? '#2E7D32' : '#516752', textDecoration: 'none', borderBottom: '1px solid #F0F7EE' }}>
                              <span>{child.icon}</span> {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to={item.path} onClick={() => setMobileOpen(false)}
                    style={{ display: 'block', padding: '13px 0', fontSize: 22, fontFamily: 'Cormorant Garamond', fontWeight: 600, color: location.pathname === item.path ? '#2E7D32' : '#0F1C10', borderBottom: '1px solid #E8F5E9', textDecoration: 'none' }}>
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}

            <motion.a href="tel:+919736419705" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', color: 'white', padding: '14px 28px', borderRadius: 100, fontWeight: 600, marginTop: 20, textDecoration: 'none', fontSize: 15, boxShadow: '0 4px 20px rgba(46,125,50,0.3)' }}>
              📞 +91 9736419705
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
