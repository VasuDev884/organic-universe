import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from '../components/Particles';
import { CLIENTS } from '../data';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
});

const PALETTE = ['#1B5E20','#1565C0','#6A1B9A','#BF360C','#E65100','#0D47A1','#880E4F','#004D40'];
const getColor = (name) => PALETTE[name.charCodeAt(0) % PALETTE.length];
const getInitials = (name) => name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

const TESTIMONIALS = [
  { name: 'ITC Agribusiness', role: 'Agribusiness', quote: 'Organic Universe made our complex multi-state certification seamless. Their NPOP expertise is unmatched.', rating: 5 },
  { name: 'Planet Ayurveda', role: 'Ayurveda & Herbs', quote: 'Professional, knowledgeable and always available. They guided us through EU Organic with ease.', rating: 5 },
  { name: 'Body Cupid (WOW)', role: 'Cosmetics', quote: 'The team understood our cosmetics certification requirements perfectly. Highly recommended.', rating: 5 },
];

export default function Clients() {
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const filtered = CLIENTS.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', paddingTop: 160, paddingBottom: 120, overflow: 'hidden', background: '#040D05' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: bgY }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1560264280-88b68371db39?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,13,5,0.92) 0%, rgba(27,94,32,0.65) 100%)' }} />
        <Particles count={25} color="rgba(139,195,74,0.4)" />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,195,74,0.15)', border: '1px solid rgba(139,195,74,0.35)', color: '#8BC34A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28 }}>
              Our Clients
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(44px, 7vw, 96px)', color: 'white', lineHeight: 1, marginBottom: 24, letterSpacing: '-1px' }}>
              Trusted by India's<br /><em style={{ color: '#8BC34A' }}>Leading</em> Organic<br />Businesses
            </h1>
          </motion.div>

          {/* Big stat row */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={{ display: 'flex', gap: 60, justifyContent: 'center', flexWrap: 'wrap', marginTop: 52 }}>
            {[['50+', 'Happy Clients'], ['25+', 'Years Experience'], ['12+', 'Standards Supported']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 56, fontWeight: 700, color: '#8BC34A', lineHeight: 1 }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CLIENT GRID */}
      <section style={{ padding: '100px 40px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...reveal()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div className="section-label">Client Portfolio</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(32px, 4vw, 52px)', color: '#0F1C10' }}>
                Our Satisfied <em>Clients</em>
              </h2>
            </div>

            {/* Search */}
            <motion.div animate={{ width: focused ? 280 : 220 }} transition={{ type: 'spring', stiffness: 300 }}
              style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search clients..."
                style={{ paddingLeft: 44, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: `2px solid ${focused ? '#2E7D32' : '#D4E8D4'}`, borderRadius: 100, fontSize: 14, outline: 'none', width: '100%', fontFamily: 'Outfit', background: 'var(--bg)', color: '#0F1C10', transition: 'border 0.2s' }}
              />
            </motion.div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {filtered.map((client, i) => {
              const color = getColor(client);
              return (
                <motion.div key={client}
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.025, 0.5), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(46,125,50,0.12)' }}
                  style={{ background: 'white', border: '1px solid #E8F5E9', borderRadius: 18, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--shadow-sm)', cursor: 'default', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    style={{ width: 50, height: 50, borderRadius: 14, background: color + '14', border: `2px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, color, fontSize: 15, fontFamily: 'Cormorant Garamond' }}
                  >
                    {getInitials(client)}
                  </motion.div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#0F1C10', lineHeight: 1.3 }}>{client}</div>
                    <div style={{ fontSize: 11, color: '#8BC34A', marginTop: 3, fontWeight: 600 }}>🌿 Certified Partner</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: 80 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p style={{ color: '#516752', fontSize: 16 }}>No clients found matching "{search}"</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '100px 40px', background: '#040D05', position: 'relative', overflow: 'hidden' }}>
        <Particles count={20} color="rgba(201,168,76,0.25)" />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: 'center', color: '#8BC34A' }}>Testimonials</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: 'white' }}>
              What Our Clients <em style={{ color: '#8BC34A' }}>Say</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, padding: '40px 32px', transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,195,74,0.08)'; e.currentTarget.style.borderColor = 'rgba(139,195,74,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ color: '#C9A84C', fontSize: 22, letterSpacing: 2, marginBottom: 20 }}>
                  {'★'.repeat(t.rating)}
                </div>
                <div style={{ fontSize: 44, color: 'rgba(139,195,74,0.2)', fontFamily: 'Cormorant Garamond', lineHeight: 0.8, marginBottom: 12 }}>"</div>
                <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 19, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: 28 }}>
                  {t.quote}
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: '#8BC34A', fontSize: 12, marginTop: 3, fontWeight: 500 }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
